import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Button,
  Input,
  useDisclosure,
  useToast
} from '@chakra-ui/react';

import { createLibrary } from '@/lib/db';   
import { useAuth } from '@/lib/auth'
import { mutate } from 'swr'

const AddLibraryModal = ({children}) => {
    const toast = useToast();
  const initialRef = useRef();
  const auth = useAuth()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register } = useForm();

  const onCreateLibrary = ({name}) => {
       const newLibrary = {
      authorId: auth.user ? auth.user.uid : 'no user',
      createdAt: new Date().toISOString(),
      name,
      settings: {
        iconos: true,
        timestamp: true,
        ratings: false
      }
    };
    const { id } = createLibrary(newLibrary);
     toast({
      title: 'Success!',
      description: "We've added your library.",
      status: 'success',
      duration: 5000,
      isClosable: true
    });
     mutate(
      ['/api/libraries', auth.user.token],
      async (data) => ({
       libraries: [{id, ...newLibrary}, ...data.libraries, ] 
      }),
      false
    );
    onClose();
  };

  return (
    <>
     
       <Button
       onClick={onOpen}
            backgroundColor="brand.blue"
            color="brand.white"
            fontWeight="medium"
            _hover={{ bg: 'gray.700' }}
            _active={{
              bg: 'gray.800',
              transform: 'scale(0.95)'
            }}
          >
            {children}
          </Button>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" 
        onSubmit={handleSubmit(onCreateLibrary)}
        >
          <ModalHeader fontWeight="bold">Add Library</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                // ref={initialRef}
                placeholder="My Library"
                name="name"
                ref={register({
                  required: 'Required'
                })}
              />
            </FormControl>

          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3} fontWeight="medium">
              Cancel
            </Button>
            <Button
              backgroundColor="#99FFFE"
              color="#194D4C"
              fontWeight="medium"
              type="submit"
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddLibraryModal;