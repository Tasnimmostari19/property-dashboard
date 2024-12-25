'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Input, Button, message } from 'antd';
import { HomeOutlined, DownOutlined } from '@ant-design/icons';
import { Input as AntInput, Dropdown as AntDropdown, Menu as AntMenu } from 'antd'; 
import Layout from '../Component/Layout';




type PropertyFormData = {
  name: string;
  type: string;
  status: string;
  address: string;
};

export default function AddProperty() {
  const [form] = Form.useForm();
  const router = useRouter();
  const [property, setProperty] = useState<PropertyFormData>({ name: '', type: '', status: '', address: '' }); // Added state for property

  const handleChange = (e) => {
    setProperty({ ...property, [e.target.name]: e.target.value });
    form.setFieldsValue({ [e.target.name]: e.target.value });
  };

  const onFinish = (values: PropertyFormData) => {
    const storedProperties = localStorage.getItem('properties');
    const properties = storedProperties ? JSON.parse(storedProperties) : [];
    const newProperty = {
      ...values,
      id: Date.now().toString(),
    };
    properties.push(newProperty);
    localStorage.setItem('properties', JSON.stringify(properties));
    message.success('Property added successfully');
    router.push('/');
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Add New Property</h1>
      <Form
        form={form}
        name="add_property"
        onFinish={onFinish}
        layout="vertical"
        className="max-w-lg"
      >
        <Form.Item
          name="name"
          label="Property Name"
          rules={[{ required: true, message: 'Please input the property name!' }]}
        >
          <Input placeholder="Enter property name" onChange={(e) => handleChange(e)} /> 
        </Form.Item>

        <Form.Item name="type" label="Property Type" rules={[{ required: true, message: 'Please select the property type!' }]}>
          <AntDropdown
            overlay={
              <AntMenu onClick={({ key }) => handleChange({ target: { name: 'type', value: key } })}>
                <AntMenu.Item key="Apartment">Apartment</AntMenu.Item>
                <AntMenu.Item key="House">House</AntMenu.Item>
                <AntMenu.Item key="Commercial">Commercial</AntMenu.Item>
              </AntMenu>
            }
          >
            <button className="ant-input" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {property.type || 'Select Type'} <DownOutlined />
            </button>
          </AntDropdown>
        </Form.Item>

        <Form.Item name="status" label="Rental Status" rules={[{ required: true, message: 'Please select the rental status!' }]}>
          <AntDropdown
            overlay={
              <AntMenu onClick={({ key }) => handleChange({ target: { name: 'status', value: key } })}>
                <AntMenu.Item key="Available">Available</AntMenu.Item>
                <AntMenu.Item key="Rented">Rented</AntMenu.Item>
              </AntMenu>
            }
          >
            <button className="ant-input" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {property.status || 'Select Status'} <DownOutlined />
            </button>
          </AntDropdown>
        </Form.Item>

        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: 'Please input the property address!' }]}
        >
          <Input.TextArea rows={4} placeholder="Enter property address" onChange={(e) => handleChange(e)} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="bg-indigo-500 hover:bg-blue-700">
            Add Property
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
}
