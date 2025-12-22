import { getApiConfig } from '../config/api';

export interface NotaryAppointment {
  id?: number;
  notary_page: number;
  client_name: string;
  client_email: string;
  client_phone: string;
  appointment_type: string;
  appointment_date: string;
  appointment_time: string;
  status?: string;
  notes?: string;
}

export interface NotaryDocument {
  id?: number;
  notary_page: number;
  appointment?: number;
  document_file: File | string;
  document_name: string;
  file_size?: number;
  uploaded_at?: string;
}

const getHeaders = () => {
  const { subdomain, tenantId } = getApiConfig();
  return {
    'X-Tenant-Id': tenantId,
    'X-Subdomain': subdomain,
  };
};

// Appointments API
export const createAppointment = async (data: NotaryAppointment) => {
  const { cmsUrl } = getApiConfig();
  const response = await fetch(`${cmsUrl}/notary-appointments/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getHeaders(),
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create appointment');
  return response.json();
};

export const getAppointments = async (notaryPageId?: number, status?: string) => {
  const { cmsUrl } = getApiConfig();
  const params = new URLSearchParams();
  if (notaryPageId) params.append('notary_page', notaryPageId.toString());
  if (status) params.append('status', status);
  
  const response = await fetch(`${cmsUrl}/notary-appointments/?${params}`, {
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error('Failed to fetch appointments');
  return response.json();
};

export const confirmAppointment = async (id: number) => {
  const { cmsUrl } = getApiConfig();
  const response = await fetch(`${cmsUrl}/notary-appointments/${id}/confirm/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getHeaders(),
    },
  });
  if (!response.ok) throw new Error('Failed to confirm appointment');
  return response.json();
};

export const cancelAppointment = async (id: number) => {
  const { cmsUrl } = getApiConfig();
  const response = await fetch(`${cmsUrl}/notary-appointments/${id}/cancel/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getHeaders(),
    },
  });
  if (!response.ok) throw new Error('Failed to cancel appointment');
  return response.json();
};

// Documents API
export const uploadDocument = async (data: { notary_page: number; appointment?: number; document_file: File; document_name: string }) => {
  const { cmsUrl } = getApiConfig();
  const formData = new FormData();
  formData.append('notary_page', data.notary_page.toString());
  if (data.appointment) formData.append('appointment', data.appointment.toString());
  formData.append('document_file', data.document_file);
  formData.append('document_name', data.document_name);
  
  const response = await fetch(`${cmsUrl}/notary-documents/`, {
    method: 'POST',
    headers: getHeaders(),
    body: formData,
  });
  if (!response.ok) throw new Error('Failed to upload document');
  return response.json();
};

export const getDocuments = async (notaryPageId?: number, appointmentId?: number) => {
  const { cmsUrl } = getApiConfig();
  const params = new URLSearchParams();
  if (notaryPageId) params.append('notary_page', notaryPageId.toString());
  if (appointmentId) params.append('appointment', appointmentId.toString());
  
  const response = await fetch(`${cmsUrl}/notary-documents/?${params}`, {
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error('Failed to fetch documents');
  return response.json();
};
