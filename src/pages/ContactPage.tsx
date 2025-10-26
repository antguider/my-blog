import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Alert,
  useTheme,
} from '@mui/material';
import { Email, Phone, LocationOn, Send } from '@mui/icons-material';

const ContactPage: React.FC = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this data to your backend
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: <Email />,
      title: 'Email',
      description: 'contact@techblog.com',
      action: 'mailto:contact@techblog.com',
    },
    {
      icon: <Phone />,
      title: 'Phone',
      description: '+1 (555) 123-4567',
      action: 'tel:+15551234567',
    },
    {
      icon: <LocationOn />,
      title: 'Location',
      description: 'San Francisco, CA',
      action: null,
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Get In Touch
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph sx={{ maxWidth: 600, mx: 'auto' }}>
          Have a question, suggestion, or want to collaborate? We'd love to hear from you. 
          Send us a message and we'll respond as soon as possible.
        </Typography>
      </Box>

      <Grid container spacing={6}>
        {/* Contact Form */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                Send us a Message
              </Typography>
              
              {isSubmitted && (
                <Alert severity="success" sx={{ mb: 3 }}>
                  Thank you for your message! We'll get back to you soon.
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Message"
                      name="message"
                      multiline
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      variant="outlined"
                      placeholder="Tell us what's on your mind..."
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      endIcon={<Send />}
                      sx={{ minWidth: 150 }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Contact Information */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {contactInfo.map((info, index) => (
              <Card key={index}>
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      mb: 2,
                      color: 'primary.main',
                    }}
                  >
                    {React.cloneElement(info.icon, { sx: { fontSize: 40 } })}
                  </Box>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {info.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {info.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>

          {/* Additional Info */}
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Response Time
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                We typically respond to all inquiries within 24 hours during business days.
              </Typography>
              
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Business Hours
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Monday - Friday: 9:00 AM - 6:00 PM PST<br />
                Saturday: 10:00 AM - 4:00 PM PST<br />
                Sunday: Closed
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* FAQ Section */}
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', mb: 4 }}>
          Frequently Asked Questions
        </Typography>
        <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  How often do you publish new articles?
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  We publish new articles weekly, typically on Tuesdays and Thursdays. 
                  We also share quick tips and updates on our social media channels.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Can I suggest article topics?
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Absolutely! We love hearing from our readers. Send us your suggestions 
                  through the contact form, and we'll consider them for future articles.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Do you offer guest posting opportunities?
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Yes! We welcome guest posts from experienced developers. 
                  Please reach out with your proposal and writing samples.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  How can I stay updated with new content?
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Follow us on social media or subscribe to our newsletter for the latest 
                  updates and exclusive content.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ContactPage;
