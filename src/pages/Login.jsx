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
  Text,
  useColorModeValue,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link as ChakraLink,
  Checkbox,
  Divider,
  HStack,
  useToast,
  Icon,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionContainer = motion(Container);

function Login() {
  const navigate = useNavigate();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'rememberMe' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // API call will be implemented here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      toast({
        title: 'Login successful',
        description: 'Welcome back to KarmaKonnect!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'Login failed. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const linkColor = useColorModeValue('teal.500', 'teal.300');

  return (
    <Box bg={bgColor} minH="100vh" py={10}>
      <MotionContainer
        maxW="container.sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <VStack spacing={8}>
          <MotionBox
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <VStack spacing={2} textAlign="center">
              <Heading
                bgGradient="linear(to-r, teal.400, blue.500)"
                bgClip="text"
                size="xl"
                mb={2}
              >
                Welcome Back
              </Heading>
              <Text color={textColor}>
                Sign in to continue your journey of making a difference
              </Text>
            </VStack>
          </MotionBox>

          <MotionBox
            w="100%"
            p={8}
            borderWidth={1}
            borderRadius="xl"
            borderColor={borderColor}
            bg={cardBg}
            boxShadow="2xl"
            _hover={{ boxShadow: '3xl' }}
            transition="all 0.3s"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <form onSubmit={handleSubmit}>
              <VStack spacing={5}>
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
                      onChange={handleChange}
                      placeholder="Enter your password"
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
                        color="gray.400"
                        _hover={{ color: 'teal.500' }}
                      >
                        <Icon as={showPassword ? FaEyeSlash : FaEye} />
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <HStack justify="space-between" w="100%">
                  <Checkbox
                    name="rememberMe"
                    isChecked={formData.rememberMe}
                    onChange={handleChange}
                    colorScheme="teal"
                    size="sm"
                  >
                    Remember me
                  </Checkbox>
                  <ChakraLink
                    as={Link}
                    to="/forgot-password"
                    color={linkColor}
                    fontSize="sm"
                    _hover={{
                      textDecoration: 'none',
                      color: useColorModeValue('teal.600', 'teal.200'),
                    }}
                  >
                    Forgot Password?
                  </ChakraLink>
                </HStack>

                <Button
                  type="submit"
                  w="100%"
                  size="lg"
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
                  mt={6}
                  isLoading={isLoading}
                  loadingText="Signing in..."
                >
                  Sign In
                </Button>

                <VStack w="100%" pt={6}>
                  <Divider />
                  <Text color={textColor} pt={4}>
                    Don't have an account?
                  </Text>
                  <HStack spacing={4}>
                    <Button
                      as={Link}
                      to="/signup/user"
                      variant="outline"
                      colorScheme="teal"
                      size="sm"
                      _hover={{
                        transform: 'translateY(-2px)',
                        boxShadow: 'md',
                      }}
                      _active={{
                        transform: 'translateY(0)',
                      }}
                    >
                      Sign up as User
                    </Button>
                    <Button
                      as={Link}
                      to="/signup/ngo"
                      variant="outline"
                      colorScheme="blue"
                      size="sm"
                      _hover={{
                        transform: 'translateY(-2px)',
                        boxShadow: 'md',
                      }}
                      _active={{
                        transform: 'translateY(0)',
                      }}
                    >
                      Register NGO
                    </Button>
                  </HStack>
                </VStack>
              </VStack>
            </form>
          </MotionBox>
        </VStack>
      </MotionContainer>
    </Box>
  );
}

export default Login; 