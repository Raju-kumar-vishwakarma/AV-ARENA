import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
} from 'npm:@react-email/components@0.0.22'
import * as React from 'npm:react@18.3.1'

interface UserConfirmationEmailProps {
  name: string
  email: string
  subject: string
  message: string
}

export const UserConfirmationEmail = ({
  name,
  email,
  subject,
  message,
}: UserConfirmationEmailProps) => (
  <Html>
    <Head />
    <Preview>Thank you for contacting AV ARENA!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Thank you for reaching out!</Heading>
        <Text style={text}>
          Hi {name},
        </Text>
        <Text style={text}>
          We've received your message and will get back to you within 24 hours.
        </Text>
        <Container style={messageBox}>
          <Text style={messageLabel}>Your Message:</Text>
          <Text style={messageSubject}><strong>Subject:</strong> {subject}</Text>
          <Text style={messageContent}>{message}</Text>
        </Container>
        <Text style={text}>
          If you have any urgent concerns, feel free to reach us at:
        </Text>
        <Text style={contactInfo}>
          📧 Email: vishwajeetrathore2006@gmail.com<br />
          📱 Phone: +91 9709705154
        </Text>
        <Text style={footer}>
          Best regards,<br />
          <strong>The AV ARENA Team</strong>
        </Text>
      </Container>
    </Body>
  </Html>
)

export default UserConfirmationEmail

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

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  padding: '0 40px',
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

const contactInfo = {
  color: '#555',
  fontSize: '14px',
  lineHeight: '24px',
  padding: '0 40px',
}

const footer = {
  color: '#666',
  fontSize: '14px',
  lineHeight: '24px',
  padding: '0 40px',
  marginTop: '32px',
}
