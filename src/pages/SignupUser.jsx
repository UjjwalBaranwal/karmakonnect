import { useState, useEffect } from 'react';
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
  Link as ChakraLink,
  HStack,
  Divider,
  FormHelperText,
  InputRightElement,
  Icon,
  Progress,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaMapMarkerAlt, FaEye, FaEyeSlash, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useLoadScript, Autocomplete } from '@react-google-maps/api';

const libraries = ['places'];

function SignupUser() {
  const navigate = useNavigate();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    latitude: '',
    longitude: '',
  });

  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    number: false,
    special: false,
    capital: false,
  });

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [autocomplete, setAutocomplete] = useState(null);

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setFormData((prev) => ({ ...prev, password }));
    
    // Password strength checks
    const checks = {
      length: password.length >= 8,
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      capital: /[A-Z]/.test(password),
    };
    setPasswordChecks(checks);
    
    // Calculate strength
    const strength = Object.values(checks).filter(Boolean).length * 25;
    setPasswordStrength(strength);
  };

  const handlePlaceSelect = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        setFormData((prev) => ({
          ...prev,
          address: place.formatted_address,
          latitude: place.geometry.location.lat(),
          longitude: place.geometry.location.lng(),
        }));
      }
    }
  };

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
        description: "We've created your account successfully!",
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
  const progressColor = useColorModeValue('teal.500', 'teal.300');

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
              Join KarmaKonnect
            </Heading>
            <Text color={useColorModeValue('gray.600', 'gray.400')}>
              Start your journey of making a difference
            </Text>
          </VStack>

          <Box
            w="100%"
            p={8}
            borderWidth={1}
            borderRadius="xl"
            borderColor={borderColor}
            bg={cardBg}
            boxShadow="2xl"
            _hover={{ boxShadow: '3xl' }}
            transition="all 0.3s"
          >
            <form onSubmit={handleSubmit}>
              <VStack spacing={5}>
                <FormControl isRequired>
                  <FormLabel>Full Name</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Icon as={FaUser} color="gray.300" />
                    </InputLeftElement>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      rounded="md"
                      _focus={{
                        borderColor: 'teal.500',
                        boxShadow: '0 0 0 1px teal.500',
                      }}
                    />
                  </InputGroup>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Icon as={FaEnvelope} color="gray.300" />
                    </InputLeftElement>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      rounded="md"
                      _focus={{
                        borderColor: 'teal.500',
                        boxShadow: '0 0 0 1px teal.500',
                      }}
                    />
                  </InputGroup>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Icon as={FaLock} color="gray.300" />
                    </InputLeftElement>
                    <Input
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handlePasswordChange}
                      placeholder="Enter password"
                      rounded="md"
                      _focus={{
                        borderColor: 'teal.500',
                        boxShadow: '0 0 0 1px teal.500',
                      }}
                    />
                    <InputRightElement width="3rem">
                      <Button
                        h="1.75rem"
                        size="sm"
                        onClick={() => setShowPassword(!showPassword)}
                        variant="ghost"
                      >
                        <Icon as={showPassword ? FaEyeSlash : FaEye} color="gray.300" />
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <Progress
                    value={passwordStrength}
                    size="xs"
                    colorScheme={
                      passwordStrength < 50
                        ? 'red'
                        : passwordStrength < 75
                        ? 'yellow'
                        : 'green'
                    }
                    mt={2}
                  />
                  <Box mt={2}>
                    <HStack spacing={4} fontSize="sm">
                      <HStack>
                        <Icon
                          as={passwordChecks.length ? FaCheckCircle : FaTimesCircle}
                          color={passwordChecks.length ? 'green.500' : 'red.500'}
                        />
                        <Text>8+ characters</Text>
                      </HStack>
                      <HStack>
                        <Icon
                          as={passwordChecks.capital ? FaCheckCircle : FaTimesCircle}
                          color={passwordChecks.capital ? 'green.500' : 'red.500'}
                        />
                        <Text>Capital letter</Text>
                      </HStack>
                    </HStack>
                    <HStack spacing={4} fontSize="sm" mt={1}>
                      <HStack>
                        <Icon
                          as={passwordChecks.number ? FaCheckCircle : FaTimesCircle}
                          color={passwordChecks.number ? 'green.500' : 'red.500'}
                        />
                        <Text>Number</Text>
                      </HStack>
                      <HStack>
                        <Icon
                          as={passwordChecks.special ? FaCheckCircle : FaTimesCircle}
                          color={passwordChecks.special ? 'green.500' : 'red.500'}
                        />
                        <Text>Special character</Text>
                      </HStack>
                    </HStack>
                  </Box>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Phone Number</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Icon as={FaPhone} color="gray.300" />
                    </InputLeftElement>
                    <InputLeftAddon>+91</InputLeftAddon>
                    <Input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      rounded="md"
                      _focus={{
                        borderColor: 'teal.500',
                        boxShadow: '0 0 0 1px teal.500',
                      }}
                    />
                  </InputGroup>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Location</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Icon as={FaMapMarkerAlt} color="gray.300" />
                    </InputLeftElement>
                    {isLoaded ? (
                      <Autocomplete
                        onLoad={setAutocomplete}
                        onPlaceChanged={handlePlaceSelect}
                      >
                        <Input
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          placeholder="Enter your address"
                          rounded="md"
                          _focus={{
                            borderColor: 'teal.500',
                            boxShadow: '0 0 0 1px teal.500',
                          }}
                        />
                      </Autocomplete>
                    ) : (
                      <Input
                        isDisabled
                        placeholder="Loading Google Maps..."
                        rounded="md"
                      />
                    )}
                  </InputGroup>
                  <FormHelperText>
                    Start typing to get location suggestions
                  </FormHelperText>
                </FormControl>

                <Button
                  type="submit"
                  size="lg"
                  w="100%"
                  mt={6}
                  rounded="md"
                  bgGradient="linear(to-r, teal.400, blue.500)"
                  color="white"
                  _hover={{
                    bgGradient: 'linear(to-r, teal.500, blue.600)',
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg',
                  }}
                  _active={{
                    transform: 'translateY(0)',
                  }}
                  transition="all 0.2s"
                >
                  Create Account
                </Button>

                <Divider my={6} />

                <Text color={useColorModeValue('gray.600', 'gray.400')}>
                  Already have an account?{' '}
                  <ChakraLink
                    as={Link}
                    to="/login"
                    color={useColorModeValue('teal.500', 'teal.300')}
                    _hover={{
                      textDecoration: 'none',
                      color: useColorModeValue('teal.600', 'teal.200'),
                    }}
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

export default SignupUser; 