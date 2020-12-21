import React from 'react';
import NextLink from 'next/link';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Flex,
  Box
} from '@chakra-ui/react';
import EditLibraryModal from './EditLibraryModal';

const LibraryHeader = ( { isLibraryOwner, library, libraryId, route }) => {
    const libraryName = library?.name
    
    return (
        <Box mx={4}>
            <Breadcrumb>
            <BreadcrumbItem>
                <NextLink href="/dashboard" passHref>
                <BreadcrumbLink>Libraries</BreadcrumbLink>
                </NextLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
            <NextLink href={`/library/${libraryId}`} passHref>
                    <BreadcrumbLink>{libraryName || '-'}</BreadcrumbLink>
                </NextLink>
                </BreadcrumbItem>
            <BreadcrumbItem>
                {libraryName && route && (
                <BreadcrumbItem>
                    <NextLink href={`library/${libraryId}/${route}`} passHref>
                    <BreadcrumbLink>{route}</BreadcrumbLink>
                    </NextLink>
                </BreadcrumbItem>
                )}
            </BreadcrumbItem>
            </Breadcrumb>
            <Flex justifyContent="space-between">
            <Heading mb={8}>{libraryName || '-'}</Heading>
            {isLibraryOwner && (
                <EditLibraryModal settings={library?.settings} libraryId={libraryId}>Edit library</EditLibraryModal>
            )}
            </Flex>
        </Box>
    )
};

export default LibraryHeader;