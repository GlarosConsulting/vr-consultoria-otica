import { useRouter } from 'next/router';
import React, { useCallback, useRef } from 'react';
import { FiUpload } from 'react-icons/fi';

import { Box, useToast, Button, Text, Flex, Tooltip } from '@chakra-ui/core';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import Dropzone from '@/components/Dropzone';
import Header from '@/components/Header';
import SEO from '@/components/SEO';
import Sidebar from '@/components/Sidebar';
import { useAuthentication } from '@/context/authentication';
import api from '@/services/api';
import isFileExtension from '@/utils/isFileExtension';

const InsertReturnFiles: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const router = useRouter();

  const { user, isLoggedIn } = useAuthentication();
  const toast = useToast();

  const handleSubmit = useCallback(async data => {
    formRef.current?.setErrors({});

    if (!data.file) {
      formRef.current.setErrors({ file: 'the file is required.' });

      toast({
        position: 'top',
        status: 'error',
        title: 'Nenhum arquivo detectado.',
        description:
          'Por favor importe o arquivo desejado clicando na zona de importação, ou clicando na mesma.',
      });

      return;
    }

    const isRet = isFileExtension(data.file.name, 'ret');

    if (!isRet) {
      toast({
        position: 'top',
        status: 'error',
        title: 'Arquivo inválido.',
        description: 'O arquivo selecionado deve ser do tipo ret.',
      });

      return;
    }

    if (!user.data?.uid || !isLoggedIn) {
      toast({
        position: 'top',
        status: 'error',
        title: 'Arquivo inválido.',
        description: 'O arquivo selecionado deve ser do tipo ret.',
      });

      return;
    }

    const formData = new FormData();

    formData.append('file', data.file);
    formData.append('user_id', user.data.uid);

    try {
      api.post('return-files', formData, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      });

      router.replace('cash-handling');

      toast({
        position: 'top',
        status: 'success',
        title: 'Arquivo importado com sucesso.',
      });
    } catch (err) {
      toast({
        position: 'top',
        status: 'error',
        title: 'Não foi possível realizar a importação.',
        description: 'Ocorreu um erro, tente novamente.',
      });
    }
  }, []);

  return (
    <>
      <SEO title="Brasil Car" image="boost.png" shouldExcludeTitleSuffix />

      <Box as="main" height="100vh" position="relative" width="100vw">
        <Header />
        <Box width="100vw" height="calc(100vh - 130px)">
          <Flex height="calc(100vh - 130px)">
            <Sidebar />
            <Flex
              width="100vw"
              paddingY={4}
              paddingX={12}
              direction="column"
              height="100%"
            >
              <Form
                ref={formRef}
                onSubmit={handleSubmit}
                css={{
                  display: 'flex',
                  width: '100%',
                  marginBottom: 16,
                }}
              >
                <Flex
                  height={{ md: '60vh', lg: '65vh', xl: '70vh' }}
                  width="100%"
                  marginY={4}
                  direction="column"
                >
                  <Tooltip
                    label="Inserir arquivos de retorno"
                    aria-label="Inserir arquivos de retorno"
                  >
                    <Button
                      type="submit"
                      height="48px"
                      backgroundColor="gray.300"
                      width={40}
                      marginBottom={6}
                    >
                      <FiUpload size={22} />
                      <Text marginLeft={4}>Importar</Text>
                    </Button>
                  </Tooltip>

                  <Dropzone
                    placeholeder="Arraste para esta área o arquivo de retorno ou clique aqui para localizá-lo em seu computador."
                    name="file"
                  />
                </Flex>
              </Form>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default InsertReturnFiles;
