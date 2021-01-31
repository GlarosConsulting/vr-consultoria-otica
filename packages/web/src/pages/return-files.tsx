import React, { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useMemo } from 'react';
import { useCallback } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { Column } from 'react-table';

import { Box, Button, Flex, Tooltip, useToast } from '@chakra-ui/core';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { format } from 'date-fns';
import FileDownload from 'js-file-download';

import DatePicker from '@/components/DatePicker';
import Header from '@/components/Header';
import SEO from '@/components/SEO';
import Sidebar from '@/components/Sidebar';
import Table from '@/components/Table';
import api from '@/services/api';

interface IReturnFiles {
  id: string;
  name: string;
  user_id: string;
  created_at: string;
}

interface IFormattedReturnFiles {
  name: string;
  created_at: string;
  button: JSX.Element;
}

const RETURN_FILES_TABLE_COLUMNS = [
  {
    Header: 'Nome do arquivo',
    accessor: 'name',
  },
  {
    Header: 'Data envio',
    accessor: 'created_at',
  },
  {
    Header: '',
    accessor: 'button',
  },
] as Column[];

const ReturnFiles: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const toast = useToast();

  const [files, setFiles] = useState<IReturnFiles[]>([]);

  useEffect(() => {
    async function loadReturnFiles() {
      const response = await api.get<IReturnFiles[]>('return-files');

      setFiles(response.data);
    }

    loadReturnFiles();
  }, [setFiles]);

  const handleSearch = useCallback(({ start_date, end_date }) => {
    async function loadReturnFiles() {
      const response = await api.get<IReturnFiles[]>('return-files', {
        params: { start_date, end_date },
      });

      setFiles(response.data);
    }

    loadReturnFiles();
  }, []);

  const handleClearFilters = useCallback(async () => {
    formRef.current.reset();

    const { data: newFiles } = await api.get('/return-files');

    setFiles(newFiles);
  }, []);

  const handleDownload = useCallback((filename: string) => {
    api
      .get(`/files/${filename}`)
      .then(response => {
        FileDownload(response.data, filename);
      })
      .catch(() => {
        toast({
          position: 'top',
          status: 'error',
          title: 'Arquivo não encontrado',
        });
      });
  }, []);

  const formattedReturnFiles: IFormattedReturnFiles[] = useMemo(
    () =>
      files.map<IFormattedReturnFiles>(file => {
        const name = file.name.split('-')[1];

        return {
          name,
          created_at: format(new Date(file.created_at), 'dd/MM/yyyy'),
          button: (
            <Button
              onClick={() => {
                handleDownload(file.name);
              }}
            >
              Download
            </Button>
          ),
        };
      }),
    [files],
  );

  return (
    <>
      <SEO title="Brasil Car" image="boost.png" shouldExcludeTitleSuffix />

      <Box as="main" height="100vh" position="relative" width="100vw">
        <Header />
        <Flex height="calc(100vh - 130px)">
          <Sidebar />
          <Flex
            paddingY={4}
            paddingX={12}
            direction="column"
            width="100%"
            height="100%"
          >
            <Form
              ref={formRef}
              onSubmit={handleSearch}
              css={{ display: 'flex', marginBottom: 16 }}
            >
              <DatePicker
                name="start_date"
                placeholderText="Data de início"
                containerProps={{ color: '#000', background: '#CBD5E0' }}
              />

              <DatePicker
                name="end_date"
                placeholderText="Data de fim"
                containerProps={{
                  color: '#000',
                  marginLeft: 6,
                  background: '#CBD5E0',
                }}
              />

              <Tooltip label="Pesquisar período" aria-label="Pesquisar período">
                <Button
                  height="48px"
                  backgroundColor="gray.300"
                  marginLeft={4}
                  type="submit"
                >
                  <FiSearch />
                </Button>
              </Tooltip>

              <Tooltip label="Limpar Filtros" aria-label="Limpar Filtros">
                <Button
                  onClick={handleClearFilters}
                  height="48px"
                  backgroundColor="gray.300"
                  marginLeft={4}
                >
                  <FiX />
                </Button>
              </Tooltip>
            </Form>

            <Table
              flex={1}
              data={formattedReturnFiles}
              width="100%"
              maxHeight={{
                xs: '20vh',
                sm: '40vh',
                md: '50vh',
                lg: '55vh',
                xl: '65vh',
              }}
              columns={RETURN_FILES_TABLE_COLUMNS}
            ></Table>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default ReturnFiles;
