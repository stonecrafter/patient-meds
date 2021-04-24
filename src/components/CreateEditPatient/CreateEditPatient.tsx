import { useEffect, useState } from 'react';
import { Modal, Form, Input, DatePicker, Button, Tag } from 'antd';
import { v4 as uuid } from 'uuid';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import { EMAIL_REGEX } from 'utils';
import { useTypedDispatch, useTypedSelector } from 'store/hooks';
import { createUpdatePatient } from 'store/patientsSlice';
import { getMedicationByIds } from 'store/medicationsSlice';

import './CreateEditPatient.css';

type Props = {
  onClose: () => void;
  visible: boolean;
  patient?: Patient;
};

type MedicationEdit = {
  id: string;
  name: string;
};

const CreateEditPatient = (props: Props) => {
  const { onClose, visible, patient } = props;
  const [form] = Form.useForm();
  const dispatch = useTypedDispatch();
  const history = useHistory();
  const medicationList = useTypedSelector((state) =>
    patient ? getMedicationByIds(state, patient.medications) : []
  );
  const [editingMedicationList, setEditingMedicationList] = useState<
    MedicationEdit[]
  >(medicationList);

  useEffect(() => {
    if (!patient) {
      form.setFieldsValue(undefined);
    } else {
      form.setFieldsValue({
        firstName: patient.firstName,
        lastName: patient.lastName,
        email: patient.email,
        phone: patient.phone,
        // Need to convert timestamp back to moment object for the date picker
        dateOfBirth: moment(patient.dateOfBirth),
      });
    }
  }, [form, patient]);

  useEffect(() => {
    setEditingMedicationList(medicationList);
  }, [medicationList.length]);

  const onCancel = () => {
    // Reset the medication list
    setEditingMedicationList(medicationList);
    onClose();
  };

  const onRemoveMedication = (id: string) => {
    setEditingMedicationList(
      editingMedicationList.filter((med) => med.id !== id)
    );
  };

  const onPatientCreate = async (values: PatientCreateForm) => {
    // It is also possible to make email the unique identifier
    // but for deep linking to a specific user profile, it might
    // be better to use a uuid, though it is less descriptive
    // In the real world, one email does not necessarily always
    // belong to one person, either...
    const id = uuid();

    await dispatch(
      createUpdatePatient({
        ...values,
        id,
        // Redux wants dates as timestamps, not objects
        dateOfBirth: new Date(values.dateOfBirth).getTime(),
        medications: [],
      })
    );

    // Close modal
    onClose();

    // Navigate to newly created patient's view
    history.push(`/patient/${id}`);
  };

  const onPatientEdit = async (values: PatientEditForm) => {
    await dispatch(
      createUpdatePatient({
        ...values,
        // If we don't have a patient, we would not be calling
        // this method in the first place
        id: patient!.id,
        dateOfBirth: new Date(values.dateOfBirth).getTime(),
        medications: editingMedicationList.map(({ id }) => id),
      })
    );

    // Close modal
    onClose();
  };

  return (
    <Modal
      title={`${patient ? 'Edit' : 'New'} Patient`}
      closable={false}
      visible={visible}
      footer={
        <>
          <Button type="text" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="primary" onClick={() => form.submit()}>
            Submit
          </Button>
        </>
      }
      destroyOnClose
    >
      <Form
        key={patient ? patient.id : 'new'}
        form={form}
        preserve={false}
        name="new-patient"
        layout="vertical"
        onFinish={patient ? onPatientEdit : onPatientCreate}
        initialValues={
          patient
            ? {
                // Still need this?
                firstName: patient.firstName,
                lastName: patient.lastName,
                email: patient.email,
                phone: patient.phone,
                // Need to convert timestamp back to moment object for the date picker
                dateOfBirth: moment(patient.dateOfBirth),
              }
            : undefined
        }
      >
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: 'First name is required' }]}
        >
          <Input placeholder="Patient first name" />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: 'Last name is required' }]}
        >
          <Input placeholder="Patient last name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Email is required',
            },
            {
              pattern: EMAIL_REGEX,
              message: 'Email is invalid',
            },
          ]}
        >
          <Input type="email" placeholder="Patient email" />
        </Form.Item>

        <Form.Item
          label="Phone number"
          name="phone"
          rules={[{ required: true, message: 'Phone number is required' }]}
        >
          <Input type="number" placeholder="Patient phone number" />
        </Form.Item>

        <Form.Item
          label="Date of Birth"
          name="dateOfBirth"
          rules={[{ required: true, message: 'Date of birth is required' }]}
        >
          <DatePicker
            // Do not allow birthdates in the future
            disabledDate={(current) => current > moment().endOf('day')}
          />
        </Form.Item>

        {patient && (
          <Form.Item
            label="Medications"
            tooltip="Use the medication search functionality to add medication to this patient"
          >
            {editingMedicationList.length > 0
              ? editingMedicationList.map(({ id, name }) => (
                  <Tag
                    className="tag"
                    key={id}
                    onClose={() => {
                      onRemoveMedication(id);
                    }}
                    closable
                  >
                    {name}
                  </Tag>
                ))
              : 'None'}
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default CreateEditPatient;
