import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useEffect } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { Column } from 'react-table';

import { Box, Button, Flex, Text, Tooltip } from '@chakra-ui/core';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { format } from 'date-fns';

import InspectionInfoModal from '@/components/_pages/app/inspections/InspectionInfoModal';
import DatePicker from '@/components/DatePicker';
import Header from '@/components/Header';
import Select from '@/components/Select';
import SEO from '@/components/SEO';
import Sidebar from '@/components/Sidebar';
import Table from '@/components/Table';
import IFormattedInspection from '@/interfaces/inspections/IFormattedInspection';
import IInspection from '@/interfaces/inspections/IInspection';
import api from '@/services/api';
import getStatusFromInspections from '@/utils/getStatusFromInspections';

interface IFormData {
  start_date: Date;
  end_date: Date;
  status: 'pending' | 'approved' | 'refused';
}

interface IFirebaseUser {
  uid: string;
  displayName: string;
}

const INSPECTIONS_TABLE_COLUMNS = [
  {
    Header: 'Nome',
    accessor: 'name',
  },
  {
    Header: 'Data de envio',
    accessor: 'send_date',
  },
  {
    Header: 'Data limite',
    accessor: 'limit_date',
  },
  {
    Header: 'Status',
    accessor: 'status',
  },
] as Column[];

const Inspections: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [inspections, setInspections] = useState<IInspection[]>([]);
  const [firebaseUsers, setFirebaseUsers] = useState<IFirebaseUser[]>([]);

  const [
    openInspectionInfo,
    setOpenInspectionInfo,
  ] = useState<IFormattedInspection>();

  useEffect(() => {
    async function loadInspections() {
      const { data: newInspections } = await api.get<IInspection[]>(
        '/inspections',
      );

      setInspections(newInspections);
    }

    loadInspections();
  }, []);

  useEffect(() => {
    async function loadFirebaseUsers() {
      const firebaseUserIds = inspections.map(item => item.user_id);

      for (const id of firebaseUserIds) {
        let newFirebaseUser: IFirebaseUser;

        try {
          const { data: firebaseUser } = await api.get<IFirebaseUser>(
            `/firebase-users/${id}`,
          );

          newFirebaseUser = firebaseUser;
        } catch {
          newFirebaseUser = {
            uid: id,
            displayName: 'Não encontrado',
          };
        }

        setFirebaseUsers(state => [...state, newFirebaseUser]);
      }
    }

    loadFirebaseUsers();
  }, [inspections]);

  const handleSearch = useCallback(
    async ({ start_date, end_date, status }: IFormData) => {
      const { data: newInspections } = await api.get<IInspection[]>(
        '/inspections/not-detailed',
        {
          params: {
            start_date,
            end_date,
            status: status.length ? status : undefined,
          },
        },
      );

      setInspections(newInspections);
    },
    [],
  );

  const handleCleanFilters = useCallback(async () => {
    const { data: newInspections } = await api.get<IInspection[]>(
      '/inspections',
    );

    setInspections(newInspections);

    formRef.current.reset();
  }, []);

  const handleOpenInspectionInfoModal = useCallback(
    (formattedInspection: IFormattedInspection) => {
      setOpenInspectionInfo(formattedInspection);
    },
    [],
  );

  const handleCloseInspectionInfoModal = useCallback(async () => {
    setOpenInspectionInfo(undefined);

    await handleCleanFilters();
  }, [handleCleanFilters]);

  const formattedInspections: IFormattedInspection[] = useMemo(
    () =>
      inspections?.map<IFormattedInspection>(row => {
        const status = getStatusFromInspections(row.status);

        const firebaseUser = firebaseUsers.find(
          user => user.uid === row.user_id,
        );

        return {
          name: firebaseUser?.displayName || 'Carregando...',
          send_date: format(new Date(row.created_at), 'dd/MM/yyyy'),
          limit_date: format(new Date(row.limit_date), 'dd/MM/yyyy'),
          status: status && <Text color={status.color}>{status.label}</Text>,
          original: row,
        };
      }) || [],
    [firebaseUsers, inspections],
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
              onSubmit={handleSearch}
              ref={formRef}
              css={{ display: 'flex', marginBottom: 16 }}
            >
              <DatePicker
                placeholderText="Data de início"
                name="start_date"
                containerProps={{ color: '#000', background: '#CBD5E0' }}
              />

              <DatePicker
                placeholderText="Data de fim"
                name="end_date"
                containerProps={{
                  background: '#CBD5E0',
                  marginLeft: 6,
                }}
              />

              <Select
                placeholder="Situação"
                backgroundColor="#CBD5E0"
                name="status"
                containerProps={{
                  backgroundColor: '#CBD5E0',
                  width: 250,
                  marginLeft: 6,
                  border: '1px solid',
                  borderColor: '#A0AEC0',
                }}
              >
                <option value="pending">Pendente</option>
                <option value="approved">Aprovado</option>
                <option value="refused">Recusado</option>
              </Select>

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

              <Tooltip label="Limpar filtros" aria-label="Limpar filtros">
                <Button
                  onClick={handleCleanFilters}
                  height="48px"
                  backgroundColor="gray.300"
                  marginLeft={4}
                >
                  <FiX />
                </Button>
              </Tooltip>
            </Form>

            <Table
              columns={INSPECTIONS_TABLE_COLUMNS}
              data={formattedInspections}
              onRowClick={row =>
                handleOpenInspectionInfoModal(
                  row.original as IFormattedInspection,
                )
              }
              flex={1}
              width="100%"
              maxHeight={{
                xs: '20vh',
                sm: '40vh',
                md: '50vh',
                lg: '55vh',
                xl: '65vh',
              }}
            ></Table>
          </Flex>
        </Flex>
      </Box>

      <InspectionInfoModal
        isOpen={!!openInspectionInfo}
        inspection={openInspectionInfo}
        onClose={handleCloseInspectionInfoModal}
      />
    </>
  );
};

export default Inspections;
