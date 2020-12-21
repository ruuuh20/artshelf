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
  useDisclosure,
  useToast,
  Switch
} from '@chakra-ui/react';

import { updateLibrary } from '@/lib/db';   
import { useAuth } from '@/lib/auth'
import { mutate } from 'swr'

const EditLibraryModal = ({settings, libraryId, children }) => {
    const toast = useToast();
  const auth = useAuth()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register } = useForm();

  const onUpdateLibrary = async (newSettings) => {
      await updateLibrary(libraryId, {
          settings: newSettings
      });
     toast({
      title: 'Success!',
      description: "We've updated your library.",
      status: 'success',
      duration: 5000,
      isClosable: true
    });
     mutate(`/api/library/${libraryId}`, auth.user.token);
    onClose();
  };

  return (
    <>
       <Button
       onClick={onOpen}
            backgroundColor="gray.900"
            color="white"
            fontWeight="medium"
            _hover={{ bg: 'gray.700' }}
            _active={{
              bg: 'gray.800',
              transform: 'scale(0.95)'
            }}
          >
            {children}
          </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" 
        onSubmit={handleSubmit(onUpdateLibrary)}
        >
          <ModalHeader fontWeight="bold">Edit Library</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Switch
                key={settings?.timestamp}
                name="timestamp"
                ref={register()}
                color="green"
                defaultIsChecked={settings?.timestamp}
              />
              <FormLabel ml={2} htmlFor="show-timestamp">Show timestamp</FormLabel>
            </FormControl>
            <FormControl>
              <Switch
                key={settings?.icons}
                name="icons"
                ref={register()}
                color="green"
                defaultIsChecked={settings?.icons}
              />
              <FormLabel ml={2} htmlFor="show-icons">Show icons</FormLabel>
            </FormControl>
            <FormControl>
              <Switch
                key={settings?.ratings}
                name="ratings"
                ref={register()}
                color="green"
                defaultIsChecked={settings?.ratings}
              />
              <FormLabel ml={2} htmlFor="show-ratings">Show ratings</FormLabel>
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
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditLibraryModal;