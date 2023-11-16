import jsPDF from 'jspdf';
import { IUserProfile } from 'src/interfaces';

/**
 * Generates a PDF document containing profile details and contacts.
 * @param {IUserProfile} profile - The user profile object.
 * @returns {void} - The function does not return anything.
 */
export const handleProfilePdf = (profile: IUserProfile): void => {
  const doc = new jsPDF();

  doc.text('Profile Details:', 10, 10);

  const userYAxis = 20;
  doc.text(`Full Name: ${profile.full_name}`, 10, userYAxis);
  doc.text(`Email: ${profile.email}`, 10, userYAxis + 5);
  doc.text(`Cellphone: ${profile.phone}`, 10, userYAxis + 10);
  doc.text(`Created At: ${profile.created_at}`, 10, userYAxis + 15);

  const contactsYAxis = userYAxis + 30;
  doc.text('Contacts:', 10, contactsYAxis);
  profile.contacts.forEach((c, idx) => {
    const yAxis = contactsYAxis + 10 + idx * 30;
    doc.text(`Full Name: ${c.full_name}`, 20, yAxis);
    doc.text(`Email: ${c.email}`, 20, yAxis + 5);
    doc.text(`Cellphone: ${c.phone}`, 20, yAxis + 10);
    doc.text(`Created At: ${c.created_at}`, 20, yAxis + 15);
  });

  doc.save('profile.pdf');
};
