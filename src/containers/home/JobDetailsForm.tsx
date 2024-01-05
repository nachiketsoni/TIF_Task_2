import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Flex, Box } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { ActiveTab, updateValue } from "@src/slices/FormHelperSlice";
import { RootState } from "@src/store";
import FormInput from "../../components/formComponents/FormInput";
import { IJobDetails } from "../../interface/forms";

const JobDetailsForm: React.FC = () => {
  const dispatch = useDispatch();
  const store = useSelector((store: RootState) => store.FormHelper);

  const { handleChange, errors, touched, handleBlur, handleSubmit, values } =
    useFormik<IJobDetails>({
      initialValues: {
        jobTitle: store?.jobTitle || "",
        jobDetails: store?.jobDetails || "",
        jobLocation: store?.jobLocation || "",
      },
      validationSchema: Yup.object().shape({
        jobTitle: Yup.string().required("Job Title is required"),
        jobDetails: Yup.string().required("Job Details is required"),
        jobLocation: Yup.string().required("Job Location is required"),
      }),
      onSubmit: (values) => {
        dispatch(ActiveTab(2));
        // Go to next step
      },
    });

  const prevTab = () => {
    dispatch(ActiveTab(0));
  };

  useEffect(() => {
 dispatch(
   updateValue([
     { name: "jobTitle", value: values.jobTitle as string },
     { name: "jobDetails", value: values.jobDetails as string },
     { name: "jobLocation", value: values.jobLocation as string },
   ])
 );

  }, [values, dispatch]);

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit}>
      <Box width="100%">
        <FormInput
          label="Job Title"
          placeholder="Enter job title"
          name="jobTitle"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values?.jobTitle}
          error={errors?.jobTitle}
          touched={touched?.jobTitle}
        />
        <FormInput
          label="Job Details"
          placeholder="Enter job details"
          name="jobDetails"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values?.jobDetails}
          error={errors?.jobDetails}
          touched={touched?.jobDetails}
        />
        <FormInput
          label="Job Location"
          name="jobLocation"
          placeholder="Enter job location"
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.jobLocation}
          touched={touched.jobLocation}
          value={values.jobLocation}
        />
        <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
          <Button colorScheme="gray" onClick={prevTab} type="button">
            Previous
          </Button>
          <Button colorScheme="red" onClick={handleSubmit} type="submit">
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default JobDetailsForm;
