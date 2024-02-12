import React from 'react';
import { useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const StudentsPage = () => {
  const [search, setSearch] = useState('');
  const students = [
    {
      name: 'Jane Cooper',
      batch: '22',
      phone: '(225) 555-0118',
      email: 'jane@microsoft.com',
    },
    {
      name: 'Floyd Miles',
      batch: '21',
      phone: '(205) 555-0100',
      email: 'floyd@yahoo.com',
    },
    {
      name: 'Ronald Richards',
      batch: '22',
      phone: '(302) 555-0107',
      email: 'ronald@adobe.com',
    },
    {
      name: 'Marvin McKinney',
      batch: '22',
      phone: '(252) 555-0126',
      email: 'marvin@teslia.com',
    },
    {
      name: 'Jerome Bell',
      batch: '23',
      phone: '(629) 555-0129',
      email: 'jerome@google.com',
    },
    {
      name: 'Kathryn Murphy',
      batch: '23',
      phone: '(406) 555-0120',
      email: 'kathryn@microsoft.com',
    },
  ];

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-white p-4">
        <h1 className="text-3xl font-bold">Welcome StudentsPage!</h1>
      </div>
      <div className="flex flex-row">
        <div className="basis-1/4 bg-gray-100 p-4">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <ul className="mt-4">
            <li>
              <a href="#" className="text-lg">
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="text-lg">
                Sports
              </a>
            </li>
            <li>
              <a href="#" className="text-lg">
                Sports Coordinator
              </a>
            </li>
            <li>
              <a href="#" className="text-lg">
                Students
              </a>
            </li>
            <li>
              <a href="#" className="text-lg">
                Events
              </a>
            </li>
            <li>
              <a href="#" className="text-lg">
                Settings
              </a>
            </li>
          </ul>
        </div>
        <div className="basis-3/4 p-4">
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-2xl font-bold">Students</h2>
            <div className="flex flex-row items-center">
              <Input
                placeholder="Search"
                size="sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button size="sm" colorScheme="blue" leftIcon={<SearchIcon />}>
                Search
              </Button>
            </div>
          </div>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Student Name</Th>
                <Th>Batch</Th>
                <Th>Phone Number</Th>
                <Th>Email</Th>
                <Th>Delete</Th>
                <Th>More Details</Th>
              </Tr>
            </Thead>
            <Tbody>
              {students.map((student) => (
                <Tr key={student.name}>
                  <Td>{student.name}</Td>
                  <Td>{student.batch}</Td>
                  <Td>{student.phone}</Td>
                  <Td>{student.email}</Td>
                  <Td>
                    <Button size="xs" colorScheme="red" onClick={() => {}}>
                      Delete
                    </Button>
                  </Td>
                  <Td>
                    <Button size="xs" colorScheme="blue" onClick={() => {}}>
                      See More..
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <div className="flex flex-row justify-between items-center mt-4">
            <div className="flex flex-row items-center">
              <Button
                size="sm"
                colorScheme="blue"
                leftIcon={<ChevronLeftIcon />}
              >
                Previous
              </Button>
              <Button
                size="sm"
                colorScheme="blue"
                rightIcon={<ChevronRightIcon />}
              >
                Next
              </Button>
            </div>
            <div className="text-sm">Showing data 1 to 6 of 256 entries</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentsPage;
