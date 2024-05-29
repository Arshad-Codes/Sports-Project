import React from "react";
import {
    MagnifyingGlassIcon,
    ChevronUpDownIcon,
  } from '@heroicons/react/24/outline';
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    CardFooter,
    Avatar,
  } from '@material-tailwind/react';


function EmailApproval(){





    return(
    <Card className="h-full w-full mb-5 border border-gray-300 border-t-0 shadow-lg rounded-lg">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Email Requests
            </Typography>
          </div>
          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll mt-3 pl-0 pr-3 pb-3 pt-0">
        <table className="mt-2 w-full min-w-max table-auto text-left">
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
        // <div>
        //     <h1>Approve email</h1>
        // </div>
    );
}

export default EmailApproval;