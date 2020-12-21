import { Flex, Link } from '@chakra-ui/react';

export default function BookLink({ libraryId }) {
  return (
    <Flex justifyContent="space-between" mb={8} width="full" mt={1}>
      <Link fontWeight="bold" fontSize="sm" href={`/library/${libraryId}`}>
        Leave a comment →
      </Link>
      <Link fontSize="xs" color="blackAlpha.500" href="/">
        Powered by Fast Feedback
      </Link>
    </Flex>
  );
}