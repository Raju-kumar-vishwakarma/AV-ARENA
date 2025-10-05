import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from 'npm:@react-email/components@0.0.22'
import * as React from 'npm:react@18.3.1'

interface AdminNotificationEmailProps {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export const AdminNotificationEmail = ({
  name,
  email,
  phone,
  subject,
  message,
}: AdminNotificationEmailProps) => (
  <Html>
    <Head />
    <Preview>New contact form submission from {name}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>🔔 New Contact Form Submission</Heading>
        <Container style={infoBox}>
          <Text style={infoLabel}>Contact Information:</Text>
          <Text style={infoItem}><strong>Name:</strong> {name}</Text>
          <Text style={infoItem}><strong>Email:</strong> {email}</Text>
          {phone && <Text style={infoItem}><strong>Phone:</strong> {phone}</Text>}
        </Container>
        <Container style={messageBox}>
          <Text style={messageLabel}>Message Details:</Text>
          <Text style={messageSubject}><strong>Subject:</strong> {subject}</Text>
          <Text style={messageContent}>{message}</Text>
        </Container>
        <Text style={footer}>
          This is an automated notification from AV ARENA contact form.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default AdminNotificationEmail

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
}

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
  textAlign: 'center' as const,
}

const infoBox = {
  backgroundColor: '#e8f4f8',
  borderRadius: '5px',
  margin: '24px 40px',
  padding: '20px',
}

const infoLabel = {
  color: '#0066cc',
  fontSize: '14px',
  fontWeight: 'bold',
  marginBottom: '12px',
}

const infoItem = {
  color: '#333',
  fontSize: '16px',
  marginBottom: '8px',
}

const messageBox = {
  backgroundColor: '#f4f4f4',
  borderRadius: '5px',
  margin: '24px 40px',
  padding: '20px',
}

const messageLabel = {
  color: '#666',
  fontSize: '14px',
  fontWeight: 'bold',
  marginBottom: '8px',
}

const messageSubject = {
  color: '#333',
  fontSize: '16px',
  marginBottom: '12px',
}

const messageContent = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '24px',
  whiteSpace: 'pre-wrap' as const,
}

const footer = {
  color: '#999',
  fontSize: '12px',
  textAlign: 'center' as const,
  padding: '0 40px',
  marginTop: '32px',
}
