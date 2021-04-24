import { Modal, Form, Input, DatePicker, Button } from 'antd';

import { useTypedDispatch } from 'store/hooks';
import { createPatient } from 'store/patientsSlice';

type Props = {
  onClose: () => void;
  visible: boolean;
};

const NewPatient = (props: Props) => {
  const { onClose, visible } = props;
  const [form] = Form.useForm();
  const dispatch = useTypedDispatch();

  const onPatientCreate = (values: PatientForm) => {
    dispatch(
      createPatient({
        ...values,
        dateOfBirth: new Date(values.dateOfBirth).getTime(),
      })
    );
    onClose();
  };

  return (
    <Modal
      title="New Patient"
      closable={false}
      onOk={onClose}
      onCancel={onClose}
      visible={visible}
      footer={
        <>
          <Button type="text" onClick={onClose}>
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
        form={form}
        preserve={false}
        name="new-patient"
        layout="vertical"
        onFinish={onPatientCreate}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Email is required' }]}
        >
          <Input type="email" placeholder="Patient email" />
        </Form.Item>

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
          label="Date of Birth"
          name="dateOfBirth"
          rules={[{ required: true, message: 'Date of birth is required' }]}
        >
          <DatePicker />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewPatient;
