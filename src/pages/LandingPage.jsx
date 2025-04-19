import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  VStack,
  SimpleGrid,
  Image,
  Flex,
  chakra,
  Divider,
  HStack,
  useDisclosure,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaHandHoldingHeart,
  FaGamepad,
  FaNewspaper,
  FaCalendarAlt,
  FaHandsHelping,
  FaArrowRight,
  FaMedal,
  FaUsers,
  FaChartLine,
} from 'react-icons/fa';

const MotionBox = chakra(motion.div);

const creators = [
  {
    name: 'Ujjawal Baranwal',
    image: '/src/assets/user3.jpg',

    role: 'Full Stack Developer',
    description: 'Passionate about creating technology that makes a difference',
  },
  {
    name: 'Sarthak Porwal',
    image: '/src/assets/user1.jpg',
    role: 'Frontend Developer',
    description: 'Dedicated to crafting beautiful and intuitive user experiences',
  },
  {
    name: 'Kalp Mehta',
    image: '/src/assets/user2.jpg',
    role: 'Backend Developer',
    description: 'Building robust systems that power meaningful connections',
  },
  {
    name: 'Dhruv Maheshwari',
    image: '/src/assets/user4.jpg',
    role: 'UI/UX Designer',
    description: 'Creating designs that inspire and engage communities',
  },
];

const features = [
  {
    title: 'Smart Donation Platform',
    icon: FaHandHoldingHeart,
    description: 'Make secure and transparent donations to verified NGOs. Track your contributions in real-time and see the direct impact of your generosity through detailed impact reports and success stories.',
    color: 'teal.500',
    benefits: [
      'Secure payment gateway',
      'Real-time donation tracking',
      'Impact visualization',
      'Tax deduction receipts',
    ],
  },
  {
    title: 'Gamified Giving Experience',
    icon: FaGamepad,
    description: 'Transform your charitable actions into an engaging journey. Earn Punya points for every contribution, unlock achievements, and redeem rewards while making a real difference in society.',
    color: 'purple.500',
    benefits: [
      'Earn Punya points',
      'Achievement badges',
      'Exclusive rewards',
      'Monthly challenges',
    ],
  },
  {
    title: 'NGO Content Hub',
    icon: FaNewspaper,
    description: 'Stay connected with causes that matter. Access verified NGO updates, success stories, and ongoing projects. Understand the journey of your contributions and the lives they touch.',
    color: 'blue.500',
    benefits: [
      'Verified NGO profiles',
      'Project updates',
      'Success stories',
      'Impact metrics',
    ],
  },
  {
    title: 'Community Events Platform',
    icon: FaCalendarAlt,
    description: 'Discover and participate in meaningful fundraising events. Connect with like-minded individuals, organize your own events, and amplify your social impact through collective action.',
    color: 'orange.500',
    benefits: [
      'Event discovery',
      'Online & offline events',
      'Event organization tools',
      'Community networking',
    ],
  },
  {
    title: 'Volunteer Management System',
    icon: FaHandsHelping,
    description: 'Find volunteering opportunities that match your skills and interests. Connect with NGOs, track your volunteer hours, and build a portfolio of your social impact contributions.',
    color: 'green.500',
    benefits: [
      'Skill matching',
      'Time tracking',
      'Impact portfolio',
      'Volunteer certification',
    ],
  },
];

const stats = [
  { icon: FaUsers, number: '10K+', label: 'Active Users' },
  { icon: FaHandHoldingHeart, number: '₹50L+', label: 'Donations Made' },
  { icon: FaMedal, number: '100+', label: 'NGO Partners' },
  { icon: FaChartLine, number: '500+', label: 'Success Stories' },
];

function LandingPage() {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const headerBg = useColorModeValue('white', 'gray.800');

  return (
    <Box>
      {/* Sticky Header */}
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bg={headerBg}
        boxShadow="sm"
        zIndex={1000}
      >
        <Container maxW="container.xl">
          <Flex py={4} justify="space-between" align="center">
            <Heading
              size="md"
              bgGradient="linear(to-r, teal.500, blue.500)"
              bgClip="text"
            >
              KarmaKonnect
            </Heading>
            <HStack spacing={4}>
              <Button
                as={Link}
                to="/signup/user"
                colorScheme="teal"
                variant="ghost"
                size="sm"
              >
                Sign Up
              </Button>
              <Button
                as={Link}
                to="/login"
                colorScheme="teal"
                size="sm"
              >
                Login
              </Button>
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* Add margin-top to account for fixed header */}
      <Box mt="72px">
        {/* Hero Section */}
        <Box
          bg={useColorModeValue('teal.500', 'teal.600')}
          color="white"
          py={20}
          position="relative"
          overflow="hidden"
        >
          <Container maxW="container.xl">
            <VStack spacing={8} textAlign="center" position="relative" zIndex={1}>
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Heading
                  size="2xl"
                  bgGradient="linear(to-r, white, teal.100)"
                  bgClip="text"
                  fontWeight="extrabold"
                  mb={4}
                >
                  KarmaKonnect
                </Heading>
                <Text fontSize="xl" maxW="container.md" mx="auto">
                  Empowering change through connection. Join our platform to make a meaningful impact
                  in society while earning rewards for your contributions.
                </Text>
              </MotionBox>

              <Stack
                direction={{ base: 'column', md: 'row' }}
                spacing={4}
                w={{ base: 'full', md: 'auto' }}
              >
                <Button
                  as={Link}
                  to="/signup/user"
                  colorScheme="whiteAlpha"
                  size="lg"
                  fontSize="md"
                  rounded="full"
                  px={8}
                  _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
                >
                  Join as User
                </Button>
                <Button
                  as={Link}
                  to="/signup/ngo"
                  colorScheme="blackAlpha"
                  size="lg"
                  fontSize="md"
                  rounded="full"
                  px={8}
                  _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
                >
                  Register NGO
                </Button>
                <Button
                  as={Link}
                  to="/login"
                  variant="outline"
                  colorScheme="whiteAlpha"
                  size="lg"
                  fontSize="md"
                  rounded="full"
                  px={8}
                  _hover={{
                    bg: 'whiteAlpha.200',
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg',
                  }}
                >
                  Sign In
                </Button>
              </Stack>
            </VStack>
          </Container>
          {/* Background Pattern */}
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg="url('data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.05' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E')"
            opacity={0.1}
          />
        </Box>

        {/* Stats Section */}
        <Container maxW="container.xl" py={16}>
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={8}>
            {stats.map((stat, index) => (
              <MotionBox
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <VStack
                  bg={cardBg}
                  p={6}
                  rounded="xl"
                  boxShadow="xl"
                  borderWidth={1}
                  borderColor={borderColor}
                  _hover={{ transform: 'translateY(-4px)', boxShadow: '2xl' }}
                  transition="all 0.3s"
                >
                  <Icon as={stat.icon} w={8} h={8} color="teal.500" />
                  <Text fontSize="3xl" fontWeight="bold">
                    {stat.number}
                  </Text>
                  <Text color={textColor}>{stat.label}</Text>
                </VStack>
              </MotionBox>
            ))}
          </SimpleGrid>
        </Container>

        {/* Features Section */}
        <Box py={20} bg={useColorModeValue('white', 'gray.800')}>
          <Container maxW="container.xl">
            <VStack spacing={16}>
              <VStack spacing={4} textAlign="center">
                <Heading
                  size="2xl"
                  bgGradient="linear(to-r, teal.400, blue.500)"
                  bgClip="text"
                >
                  Our Features
                </Heading>
                <Text color={textColor} fontSize="lg" maxW="container.md">
                  Discover how KarmaKonnect makes charitable giving more engaging,
                  transparent, and impactful
                </Text>
              </VStack>

              {features.map((feature, index) => (
                <MotionBox
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  w="100%"
                >
                  <Flex
                    direction={{ base: 'column', lg: index % 2 === 0 ? 'row' : 'row-reverse' }}
                    align="center"
                    justify="space-between"
                    gap={8}
                  >
                    <Box flex={1}>
                      <VStack align="flex-start" spacing={6}>
                        <Icon as={feature.icon} w={12} h={12} color={feature.color} />
                        <Heading size="xl" color={feature.color}>
                          {feature.title}
                        </Heading>
                        <Text fontSize="lg" color={textColor}>
                          {feature.description}
                        </Text>
                        <SimpleGrid columns={2} spacing={4}>
                          {feature.benefits.map((benefit, idx) => (
                            <HStack key={idx}>
                              <Icon as={FaArrowRight} color={feature.color} />
                              <Text color={textColor}>{benefit}</Text>
                            </HStack>
                          ))}
                        </SimpleGrid>
                        <Button
                          variant="outline"
                          colorScheme="teal"
                          rightIcon={<FaArrowRight />}
                          rounded="full"
                        >
                          Learn More
                        </Button>
                      </VStack>
                    </Box>
                    <Box
                      flex={1}
                      bg={cardBg}
                      p={8}
                      rounded="2xl"
                      boxShadow="xl"
                      borderWidth={1}
                      borderColor={borderColor}
                    >
                      {/* Placeholder for feature illustration */}
                      <Box
                        h="300px"
                        bg={`${feature.color}20`}
                        rounded="xl"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Icon as={feature.icon} w={24} h={24} color={feature.color} />
                      </Box>
                    </Box>
                  </Flex>
                </MotionBox>
              ))}
            </VStack>
          </Container>
        </Box>

        {/* Team Section */}
        <Box py={20}>
          <Container maxW="container.xl">
            <VStack spacing={16}>
              <VStack spacing={4} textAlign="center">
                <Heading
                  size="2xl"
                  bgGradient="linear(to-r, teal.400, blue.500)"
                  bgClip="text"
                >
                  Meet Our Team
                </Heading>
                <Text color={textColor} fontSize="lg" maxW="container.md">
                  The passionate minds behind KarmaKonnect working to create positive change
                </Text>
              </VStack>

              <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
                {creators.map((creator, index) => (
                  <MotionBox
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <VStack
                      p={6}
                      bg={cardBg}
                      rounded="xl"
                      boxShadow="xl"
                      borderWidth={1}
                      borderColor={borderColor}
                      spacing={4}
                      _hover={{ transform: 'translateY(-8px)', boxShadow: '2xl' }}
                      transition="all 0.3s"
                    >
                      <Box
                        rounded="full"
                        overflow="hidden"
                        boxSize="150px"
                        boxShadow="md"
                      >
                        <Image
                          src={creator.image}
                          alt={creator.name}
                          w="100%"
                          h="100%"
                          objectFit="cover"
                          transition="transform 0.3s"
                          _hover={{ transform: 'scale(1.1)' }}
                        />
                      </Box>
                      <VStack spacing={2}>
                        <Heading size="md">{creator.name}</Heading>
                        <Text color="teal.500" fontWeight="bold">
                          {creator.role}
                        </Text>
                        <Text color={textColor} textAlign="center" fontSize="sm">
                          {creator.description}
                        </Text>
                      </VStack>
                    </VStack>
                  </MotionBox>
                ))}
              </SimpleGrid>
            </VStack>
          </Container>
        </Box>

        {/* Call to Action */}
        <Box bg={useColorModeValue('teal.500', 'teal.600')} color="white" py={20}>
          <Container maxW="container.xl">
            <VStack spacing={8} textAlign="center">
              <Heading size="2xl">Ready to Make a Difference?</Heading>
              <Text fontSize="xl" maxW="container.md">
                Join KarmaKonnect today and be part of a community that's creating positive change.
                Every small action counts!
              </Text>
              <Stack
                direction={{ base: 'column', md: 'row' }}
                spacing={4}
                w={{ base: 'full', md: 'auto' }}
              >
                <Button
                  as={Link}
                  to="/signup/user"
                  colorScheme="whiteAlpha"
                  size="lg"
                  rounded="full"
                  px={8}
                  _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
                >
                  Get Started Now
                </Button>
                <Button
                  as={Link}
                  to="/about"
                  variant="outline"
                  colorScheme="whiteAlpha"
                  size="lg"
                  rounded="full"
                  px={8}
                  _hover={{
                    bg: 'whiteAlpha.200',
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg',
                  }}
                >
                  Learn More
                </Button>
              </Stack>
            </VStack>
          </Container>
        </Box>
      </Box>

      {/* Footer */}
      <Box bg={useColorModeValue('gray.50', 'gray.900')} color={textColor}>
        <Container maxW="container.xl" py={16}>
          <SimpleGrid columns={{ base: 1, md: 4 }} spacing={8}>
            <VStack align="flex-start" spacing={4}>
              <Heading size="md" color={useColorModeValue('gray.700', 'white')}>
                KarmaKonnect
              </Heading>
              <Text>Making giving more meaningful</Text>
            </VStack>
            
            <VStack align="flex-start" spacing={4}>
              <Heading size="sm" color={useColorModeValue('gray.700', 'white')}>
                Quick Links
              </Heading>
              <Button as={Link} to="/about" variant="link" color={textColor}>
                About Us
              </Button>
              <Button as={Link} to="/contact" variant="link" color={textColor}>
                Contact
              </Button>
              <Button as={Link} to="/blog" variant="link" color={textColor}>
                Blog
              </Button>
            </VStack>

            <VStack align="flex-start" spacing={4}>
              <Heading size="sm" color={useColorModeValue('gray.700', 'white')}>
                Legal
              </Heading>
              <Button as={Link} to="/privacy" variant="link" color={textColor}>
                Privacy Policy
              </Button>
              <Button as={Link} to="/terms" variant="link" color={textColor}>
                Terms of Service
              </Button>
            </VStack>

            <VStack align="flex-start" spacing={4}>
              <Heading size="sm" color={useColorModeValue('gray.700', 'white')}>
                Connect With Us
              </Heading>
              <HStack spacing={4}>
                <Icon as={FaUsers} w={6} h={6} />
                <Icon as={FaHandHoldingHeart} w={6} h={6} />
                <Icon as={FaMedal} w={6} h={6} />
              </HStack>
            </VStack>
          </SimpleGrid>

          <Divider my={8} />

          <Text textAlign="center">
            © {new Date().getFullYear()} KarmaKonnect. All rights reserved.
          </Text>
        </Container>
      </Box>
    </Box>
  );
}

export default LandingPage; 