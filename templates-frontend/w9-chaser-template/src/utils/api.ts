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

const getHeaders = () => {
  const { subdomain, tenantId } = getApiConfig();
  return {
    'X-Tenant-Id': tenantId,
    'X-Subdomain': subdomain,
  };
};

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

export const uploadDocument = async (data: { notary_page: number; appointment?: number; document_file: File; document_name: string; client_name: string; client_email: string }) => {
  const { cmsUrl } = getApiConfig();
  const formData = new FormData();
  formData.append('notary_page', data.notary_page.toString());
  if (data.appointment) formData.append('appointment', data.appointment.toString());
  formData.append('document_file', data.document_file);
  formData.append('document_name', data.document_name);
  formData.append('client_name', data.client_name);
  formData.append('client_email', data.client_email);
  
  const response = await fetch(`${cmsUrl}/notary-documents/`, {
    method: 'POST',
    headers: getHeaders(),
    body: formData,
  });
  if (!response.ok) throw new Error('Failed to upload document');
  return response.json();
};
