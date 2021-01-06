import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Icon,
  useToast
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { LogIn } from 'react-feather';

import { useAuth } from '@/lib/auth';


const Login = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const { signinWithEmail } = useAuth();
  const { handleSubmit, register, errors } = useForm();

  const onLogin = ({ email, pass }) => {
    setLoading(true);
    signinWithEmail(email, pass).catch((error) => {
      setLoading(false);
      toast({
        title: 'An error occurred.',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true
      });
    });
  };

  return (
    <Flex align="center" justify="center" h="100vh" backgroundColor="rgb(249, 247, 238)">
      <Stack
        as="form"
        backgroundColor="white"
        borderRadius={[0, 8]}
        errors={errors}
        maxWidth="400px"
        onSubmit={handleSubmit((data) => onLogin(data))}
        px={8}
        py={12}
        ref={register}
        shadow={[null, 'md']}
        spacing={4}
        w="100%"
      >
        <Flex justify="center">
          <Box as="a" href="/" aria-label="Back to homepage">
            <LogIn size={48} mb={4} />
          </Box>
        </Flex>
        <FormControl isInvalid={errors.email && errors.email.message}>
          <FormLabel>Email Address</FormLabel>
          <Input
            autoFocus
            aria-label="Email Address"
            id="email"
            name="email"
            ref={register({
              required: 'Please enter your email.'
            })}
            placeholder="name@site.com"
          />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.pass && errors.pass.message}>
          <FormLabel>Password</FormLabel>
          <Input
            aria-label="Password"
            name="pass"
            id="password"
            type="password"
            ref={register({
              required: 'Please enter a password.'
            })}
          />
          <FormErrorMessage>
            {errors.pass && errors.pass.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          id="login"
          type="submit"
          backgroundColor="brand.blue"
          color="white"
          isLoading={loading}
          fontWeight="medium"
          mt={4}
          h="50px"
          fontSize="lg"
          _hover={{ bg: 'gray.700' }}
          _active={{
            bg: 'gray.800',
            transform: 'scale(0.95)'
          }}
        >
          Login
        </Button>
      </Stack>
    </Flex>
  );
};

const LoginPage = () => (
    
    <Login />

);

export default LoginPage;