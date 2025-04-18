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
  Text,
  useColorModeValue,
  InputLeftElement,
  Textarea,
  SimpleGrid,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBuilding, FaEnvelope, FaLock, FaPhone, FaIdCard, FaMapMarkerAlt } from 'react-icons/fa';

function SignupNGO() {
  const navigate = useNavigate();
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    description: '',
    location: {
      type: 'Point',
      coordinates: [0, 0], // [longitude, latitude]
    },
    address: '',
    phone: '',
    registrationNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    const [lat, lng] = formData.location.coordinates;
    
    setFormData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        coordinates: name === 'latitude' ? [lng, parseFloat(value)] : [parseFloat(value), lat],
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API call will be implemented here
      toast({
        title: 'Account created.',
        description: "We've created your NGO account.",
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

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box bg={bgColor} minH="100vh" py={10}>
      <Container maxW="container.md">
        <VStack spacing={8}>
          <VStack spacing={2} textAlign="center">
            <Heading
              bgGradient="linear(to-r, teal.400, blue.500)"
              bgClip="text"
              size="xl"
            >
              Register Your NGO
            </Heading>
            <Text color={useColorModeValue('gray.600', 'gray.400')}>
              Join our platform to expand your reach and impact
            </Text>
          </VStack>

          <Box
            w="100%"
            p={8}
            borderWidth={1}
            borderRadius="xl"
            borderColor={borderColor}
            bg={cardBg}
            boxShadow="xl"
          >
            <form onSubmit={handleSubmit}>
              <VStack spacing={5}>
                <FormControl isRequired>
                  <FormLabel>NGO Name</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <FaBuilding color="gray.300" />
                    </InputLeftElement>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter NGO name"
                      rounded="md"
                    />
                  </InputGroup>
                </FormControl>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5} w="100%">
                  <FormControl isRequired>
                    <FormLabel>Email</FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <FaEnvelope color="gray.300" />
                      </InputLeftElement>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email"
                        rounded="md"
                      />
                    </InputGroup>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <FaLock color="gray.300" />
                      </InputLeftElement>
                      <Input
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                        rounded="md"
                      />
                    </InputGroup>
                  </FormControl>
                </SimpleGrid>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5} w="100%">
                  <FormControl isRequired>
                    <FormLabel>Phone Number</FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <FaPhone color="gray.300" />
                      </InputLeftElement>
                      <InputLeftAddon>+91</InputLeftAddon>
                      <Input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                        rounded="md"
                      />
                    </InputGroup>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Registration Number</FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <FaIdCard color="gray.300" />
                      </InputLeftElement>
                      <Input
                        name="registrationNumber"
                        value={formData.registrationNumber}
                        onChange={handleChange}
                        placeholder="Enter NGO registration number"
                        rounded="md"
                      />
                    </InputGroup>
                  </FormControl>
                </SimpleGrid>

                <FormControl isRequired>
                  <FormLabel>Address</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <FaMapMarkerAlt color="gray.300" />
                    </InputLeftElement>
                    <Input
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter complete address"
                      rounded="md"
                    />
                  </InputGroup>
                </FormControl>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5} w="100%">
                  <FormControl isRequired>
                    <FormLabel>Latitude</FormLabel>
                    <Input
                      name="latitude"
                      type="number"
                      step="any"
                      value={formData.location.coordinates[1]}
                      onChange={handleLocationChange}
                      placeholder="Enter latitude"
                      rounded="md"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Longitude</FormLabel>
                    <Input
                      name="longitude"
                      type="number"
                      step="any"
                      value={formData.location.coordinates[0]}
                      onChange={handleLocationChange}
                      placeholder="Enter longitude"
                      rounded="md"
                    />
                  </FormControl>
                </SimpleGrid>

                <FormControl isRequired>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter NGO description"
                    size="md"
                    rounded="md"
                    rows={4}
                  />
                </FormControl>

                <Button
                  type="submit"
                  size="lg"
                  w="100%"
                  mt={6}
                  rounded="md"
                  bgGradient="linear(to-r, blue.400, teal.500)"
                  _hover={{
                    bgGradient: 'linear(to-r, blue.500, teal.600)',
                  }}
                >
                  Register NGO
                </Button>

                <Text color={useColorModeValue('gray.600', 'gray.400')}>
                  Already registered?{' '}
                  <ChakraLink
                    as={Link}
                    to="/login"
                    color={useColorModeValue('teal.500', 'teal.300')}
                  >
                    Login here
                  </ChakraLink>
                </Text>
              </VStack>
            </form>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}

export default SignupNGO; 