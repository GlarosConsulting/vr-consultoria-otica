import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { useMemo } from 'react';
import { FiTrash2, FiPlus, FiSearch, FiX } from 'react-icons/fi';
import { Column } from 'react-table';

import {
  Box,
  Flex,
  Text,
  Button,
  Tooltip,
  useToast,
  useDisclosure,
} from '@chakra-ui/core';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { format } from 'date-fns';
import { parseISO } from 'date-fns';

import DatePicker from '@/components/DatePicker';
import Header from '@/components/Header';
import CreateNewCashHandling from '@/components/Modals/CreateNewCashHandling';
import SEO from '@/components/SEO';
import Sidebar from '@/components/Sidebar';
import Table from '@/components/Table';
import api from '@/services/api';
import formatRealValue from '@/utils/formatRealValue';

interface IFormattedCashHandling {
  date: string;
  bank: string;
  return: JSX.Element;
  bank_tariff: JSX.Element;
  button: JSX.Element;
}

interface ICashHandling {
  id: string;
  date: string;
  bank_value: number;
  return_value: number;
  bank_tariff_value: number;
  is_previous_balance: boolean;
}

interface ISearchFormData {
  start_date: Date;
  end_date: Date;
}

const CASH_HANDLING_TABLE_COLUMNS = [
  {
    Header: 'Data',
    accessor: 'date',
  },
  {
    Header: 'Banco',
    accessor: 'bank',
  },
  {
    Header: 'Retorno',
    accessor: 'return',
  },
  {
    Header: 'Tarifa Banco',
    accessor: 'bank_tariff',
  },
  {
    Header: '',
    accessor: 'button',
  },
] as Column[];

const CashHandling: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const {
    isOpen: isCreateCashHandlingOpen,
    onOpen: onOpenCreateCashHandling,
    onClose: onCloseCashHandling,
  } = useDisclosure();
  const toast = useToast();

  const [cashHandling, setCashHandling] = useState<ICashHandling[]>([]);

  const [initialData, setInitialDate] = useState<{
    lastDate: Date;
    firstDate: Date;
  }>({ lastDate: new Date(), firstDate: new Date() });

  const [minAndMaxValue, setMinAndMaxValue] = useState<{
    minDate: Date;
    maxDate: Date;
  }>({
    minDate: new Date(),
    maxDate: new Date(),
  });

  const getCashHandling = useCallback(async () => {
    const { data: newCashHandling } = await api.get<ICashHandling[]>(
      '/cash-handling',
    );

    if (newCashHandling.length > 0) {
      setInitialDate({
        firstDate: parseISO(newCashHandling[0].date),
        lastDate: parseISO(newCashHandling[newCashHandling.length - 1].date),
      });

      setMinAndMaxValue({
        minDate: parseISO(newCashHandling[0].date),
        maxDate: parseISO(newCashHandling[newCashHandling.length - 1].date),
      });
    }

    setCashHandling(newCashHandling);
  }, []);

  useEffect(() => {
    async function loadCashHandling() {
      const { data: newCashHandling } = await api.get<ICashHandling[]>(
        '/cash-handling',
      );

      if (newCashHandling.length > 0) {
        setInitialDate({
          firstDate: parseISO(newCashHandling[0].date),
          lastDate: parseISO(newCashHandling[newCashHandling.length - 1].date),
        });

        setMinAndMaxValue({
          minDate: parseISO(newCashHandling[0].date),
          maxDate: parseISO(newCashHandling[newCashHandling.length - 1].date),
        });
      }

      setCashHandling(newCashHandling);
    }

    loadCashHandling();
  }, []);

  const handleSearch = useCallback(
    async ({ start_date, end_date }: ISearchFormData) => {
      const { data: newCashHandling } = await api.get('cash-handling', {
        params: {
          initialDate: start_date,
          finalDate: end_date,
        },
      });

      setInitialDate({
        firstDate: start_date,
        lastDate: end_date,
      });

      setCashHandling(newCashHandling);
    },
    [],
  );

  const handleClearFilters = useCallback(async () => {
    formRef.current.setData({
      start_date: minAndMaxValue.minDate,
      end_date: minAndMaxValue.maxDate,
    });

    const { data: newCashHandling } = await api.get('/cash-handling');

    setCashHandling(newCashHandling);
  }, []);

  const handleDeleteCashHandling = useCallback(async (id: string) => {
    try {
      await api.delete(`cash-handling/${id}`);

      const { data: newCashHandling } = await api.get<ICashHandling[]>(
        '/cash-handling',
      );

      if (newCashHandling.length > 0) {
        setInitialDate({
          firstDate: parseISO(newCashHandling[0].date),
          lastDate: parseISO(newCashHandling[newCashHandling.length - 1].date),
        });

        setMinAndMaxValue({
          minDate: parseISO(newCashHandling[0].date),
          maxDate: parseISO(newCashHandling[newCashHandling.length - 1].date),
        });
      }

      setCashHandling(newCashHandling);
    } catch (err) {
      toast({
        title: 'Não foi possíel excluir a movimentação de caixa.',
        description: 'Movimentação de caixa inexistente ou ocorreu um erro.',
      });
    }
  }, []);

  const formattedCashHandling = useMemo(
    () =>
      cashHandling.map<IFormattedCashHandling>(row =>
        row.is_previous_balance === true
          ? {
              date: 'SALDO ANTERIOR',
              bank: formatRealValue(row.bank_value),
              return: (
                <Text color="blue.400">
                  {formatRealValue(row.return_value)}
                </Text>
              ),
              bank_tariff: (
                <Text color="red.600">
                  {formatRealValue(row.bank_tariff_value)}
                </Text>
              ),
              button: (
                <Button onClick={() => handleDeleteCashHandling(row.id)}>
                  <FiTrash2 />
                </Button>
              ),
            }
          : {
              date: format(new Date(row.date), 'dd/MM/yyyy'),
              bank: formatRealValue(row.bank_value),
              return: (
                <Text color="blue.400">
                  {formatRealValue(row.return_value)}
                </Text>
              ),
              bank_tariff: (
                <Text color="red.600">
                  {formatRealValue(row.bank_tariff_value)}
                </Text>
              ),
              button: (
                <Button onClick={() => handleDeleteCashHandling(row.id)}>
                  <FiTrash2 />
                </Button>
              ),
            },
      ),
    [cashHandling],
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
                initialDate={initialData.firstDate}
                minDate={minAndMaxValue.minDate}
                maxDate={minAndMaxValue.maxDate}
                placeholderText="Data de início"
                name="start_date"
                containerProps={{ color: '#000', background: '#CBD5E0' }}
              />

              <DatePicker
                initialDate={initialData.lastDate}
                minDate={minAndMaxValue.minDate}
                maxDate={minAndMaxValue.maxDate}
                placeholderText="Data de fim"
                name="end_date"
                containerProps={{
                  color: '#000',
                  background: '#CBD5E0',
                  marginLeft: 6,
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

              <Tooltip
                label="Adicionar movimentação de caixa"
                aria-label="Adicionar movimentação de caixa"
              >
                <Button
                  onClick={onOpenCreateCashHandling}
                  height="48px"
                  backgroundColor="gray.300"
                  marginLeft={4}
                >
                  <FiPlus />
                </Button>
              </Tooltip>
            </Form>

            <Table
              flex={1}
              data={formattedCashHandling}
              width="100%"
              maxHeight={{
                xs: '20vh',
                sm: '40vh',
                md: '50vh',
                lg: '55vh',
                xl: '65vh',
              }}
              columns={CASH_HANDLING_TABLE_COLUMNS}
            />
            <CreateNewCashHandling
              isOpen={isCreateCashHandlingOpen}
              onClose={onCloseCashHandling}
              onSave={getCashHandling}
            />
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default CashHandling;
