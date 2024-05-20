import Student from '../../models/student.model';
import Sport from '../../models/sports.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import StudentVerification from '../../models/studentVerification.model';
import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';
import { verify, login, getStudents, editDetails, enrollToSport,getEnrolledSports } from '../../controllers/student.controller';

jest.mock('../../models/student.model');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('../../models/studentVerification.model');
jest.mock('nodemailer');
jest.mock('uuid');
jest.mock('../../models/sports.model');


describe('Student Controller', () => {
    let req;
    let res;
    beforeEach(() => {
        req = {
            body: {
                email: 'email',
                password: 'password',
                regNo: 'regNo',
                nicNo: 'nicNo',
            },
            params: {
                id: 'id',
                uniqueString: 'uniqueString',
            },
        };
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            json: jest.fn(),
        };
    }
    );

    describe('verify', () => {
        it('should return 500 if something went wrong', async () => {
            StudentVerification.findOne = jest.fn().mockRejectedValue(new Error('error'));

            await verify(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith('something went wrong');
        });
    });

    describe('login', () => {
        it('should return 500 if something went wrong', async () => {
            Student.findOne = jest.fn().mockRejectedValue(new Error('error'));

            await login(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith('something went wrong');
        });


        it('should return 404 if student not found', async () => {
            Student.findOne = jest.fn().mockResolvedValue(null);

            await login(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.send).toHaveBeenCalledWith('Student not found!');
        });

        it('should return 400 if wrong username or password', async () => {
            Student.findOne = jest.fn().mockResolvedValue({
                password: 'password',
            });
            bcrypt.compareSync = jest.fn().mockReturnValue(false);

            await login(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith('Wrong Username or Password');
        });
    });

    describe('getStudents', () => {
        it('should return 500 if something went wrong', async () => {
            Student.find = jest.fn().mockRejectedValue(new Error('error'));

            await getStudents(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith('Something went wrong');
        });

        it('should return students', async () => {
            Student.find = jest.fn().mockResolvedValue([
                {
                    email: 'email',
                    regNo: 'regNo',
                    nicNo: 'nicNo',
                },
                {
                    email: 'email1',
                    regNo: 'regNo1',
                    nicNo: 'nicNo1',
                }
            ]);

            await getStudents(req, res);

            expect(res.status).toHaveBeenCalledWith(200);


            expect(res.send).toHaveBeenCalledWith([
              {
                email: "email",
                regNo: "regNo",
                nicNo: "nicNo",
              },
              {
                email: "email1",
                regNo: "regNo1",
                nicNo: "nicNo1",
              },
            ]);
        });


        it('should return 500 if something went wrong', async () => {
            Student.find = jest.fn().mockRejectedValue(new Error('error'));

            await getStudents(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith('Something went wrong');
        });

    });

    describe('editDetails', () => {
        it('should return 404 if student not found', async () => {
            const req = {
                params: {
                    studentId: 'studentId',
                },
                body: {
                    firstName: 'firstName',
                    lastName: 'lastName',
                    dateofBirth: 'dateofBirth',
                    achievements: 'achievements',
                    regNo: 'regNo',
                    nicNo: 'nicNo',
                },
            };


            Student.findOne = jest.fn().mockResolvedValue(null);

            await editDetails(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.send).toHaveBeenCalledWith('Student not found!');
        });
    }

    );    

    describe('enrollToSport', () => {
        it('should return 404 if student not found', async () => {
            const req = {
                body: {
                    studentId: 'studentId',
                    sportId: 'sportId',
                },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
            };

            Student.findOne = jest.fn().mockResolvedValue(null);

            await enrollToSport(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.send).toHaveBeenCalledWith('Student not found!');
        });

        it('should enroll student to sport and update sport', async () => {
            const req = {
                body: {
                    studentId: 'studentId',
                    sportId: 'sportId',
                },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
            };

            const student = {
                _id: 'studentId',
                enrolledSports: [],
                save: jest.fn(),
            };
            const sport = {
                _id: 'sportId',
                enrolledStudents: [],
            };

            Student.findOne = jest.fn().mockResolvedValue(student);
            Sport.updateOne = jest.fn();
            
            await enrollToSport(req, res);

            expect(student.enrolledSports).toContain('sportId');
            expect(student.save).toHaveBeenCalled();
            expect(Sport.updateOne).toHaveBeenCalledWith(
                { _id: 'sportId' },
                {
                    $push: { enrolledStudents: 'studentId' },
                }
            );
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith('Enrolled successfully');
        });

        it('should return 500 if something went wrong', async () => {
            const req = {
                body: {
                    studentId: 'studentId',
                    sportId: 'sportId',
                },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
            };

            Student.findOne = jest.fn().mockRejectedValue(new Error('error'));

            await enrollToSport(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith('Something went wrong');
        });
    });

    describe('getEnrolledSports', () => {
        it('should return 404 if student not found', async () => {
            const req = {
                params: {
                    studentId: 'studentId',
                },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
            };

            Student.findOne = jest.fn().mockResolvedValue(null);

            await getEnrolledSports(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.send).toHaveBeenCalledWith('Student not found!');
        });

        it('should return 500 if something went wrong', async () => {
            const req = {
                params: {
                    studentId: 'studentId',
                },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
            };

            Student.findOne = jest.fn().mockRejectedValue(new Error('error'));

            await getEnrolledSports(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith('Something went wrong');
        });

        it('should return sports', async () => {
            const req = {
                params: {
                    studentId: 'studentId',
                },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
            };

            const student = {
                enrolledSports: ['sportId'],
            };
            const sports = [
                {
                    _id: 'sportId',
                },
            ];

            Student.findOne = jest.fn().mockResolvedValue(student);
            Sport.find = jest.fn().mockResolvedValue(sports);

            await getEnrolledSports(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith(sports);
        });
    });


});