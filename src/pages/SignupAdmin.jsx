import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  useToast,
  InputGroup,
  InputLeftAddon,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function SignupAdmin() {
  const navigate = useNavigate();
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    employeeId: '',
    department: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API call will be implemented here
      toast({
        title: 'Account created.',
        description: "We've created your admin account.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      navigate('/');
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={8}>
        <Heading>Admin Registration</Heading>
        <Box w="100%" p={8} borderWidth={1} borderRadius="lg">
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Full Name</FormLabel>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Phone Number</FormLabel>
                <InputGroup>
                  <InputLeftAddon>+91</InputLeftAddon>
                  <Input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                  />
                </InputGroup>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Employee ID</FormLabel>
                <Input
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleChange}
                  placeholder="Enter employee ID"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Department</FormLabel>
                <Input
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="Enter department"
                />
              </FormControl>

              <Button
                type="submit"
                colorScheme="purple"
                size="lg"
                w="100%"
                mt={4}
              >
                Register as Admin
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </Container>
  );
}

export default SignupAdmin; 