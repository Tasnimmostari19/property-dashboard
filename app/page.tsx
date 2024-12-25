'use client'

import { useState, useEffect } from 'react';
import { Table, Dropdown, Menu } from 'antd';
import Link from 'next/link';
import Layout from './Component/Layout';

type Property = {
  id: string;
  name: string;
  type: string;
  status: string;
  address: string;
};

export default function Dashboard() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  useEffect(() => {
    const storedProperties = localStorage.getItem('properties');
    if (storedProperties) {
      setProperties(JSON.parse(storedProperties));
    }
  }, []);

  useEffect(() => {
    let filtered = properties;
    if (typeFilter) {
      filtered = filtered.filter(property => property.type === typeFilter);
    }
    if (statusFilter) {
      filtered = filtered.filter(property => property.status === statusFilter);
    }
    setFilteredProperties(filtered);
  }, [properties, typeFilter, statusFilter]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  const typeMenu = (
    <Menu onClick={({ key }) => setTypeFilter(key as string)}>
      <Menu.Item key="Apartment">Apartment</Menu.Item>
      <Menu.Item key="House">House</Menu.Item>
      <Menu.Item key="Commercial">Commercial</Menu.Item>
    </Menu>
  );

  const statusMenu = (
    <Menu onClick={({ key }) => setStatusFilter(key as string)}>
      <Menu.Item key="Available">Available</Menu.Item>
      <Menu.Item key="Rented">Rented</Menu.Item>
    </Menu>
  );

  const checkIns = properties.filter(p => p.status === 'Rented').length;
  const checkOuts = properties.filter(p => p.status === 'Available').length;

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Property Management Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-indigo-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Check-ins</h2>
          <p className="text-4xl font-bold text-slate-600">{checkIns}</p>
        </div>
        <div className="bg-sky-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Check-outs</h2>
          <p className="text-4xl font-bold text-slate-600">{checkOuts}</p>
        </div>
      </div>
      <div className="mb-4 flex space-x-4">
        <Dropdown.Button overlay={typeMenu}>
          <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            Filter by Type
          </a>
        </Dropdown.Button>
        <Dropdown.Button overlay={statusMenu}>
          <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            Filter by Status
          </a>
        </Dropdown.Button>
      </div>
      <Table columns={columns} dataSource={filteredProperties} rowKey="id" />
      <div className="mt-4">
        <Link href="/add-property" className="bg-indigo-400 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded">
          Add New Property
        </Link>
      </div>
    </Layout>
  );
}