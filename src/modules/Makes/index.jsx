'use client';
import { Box, ActionIcon, Group, Image, TextInput, Select } from '@mantine/core';
import {
    IconChevronRight,
    IconCar,
    IconBike,
    IconTruck,
    IconEdit,
    IconTrash,
    IconCheck,
    IconPlus,
    IconSearch
} from '@tabler/icons-react';
import { DataTable } from 'mantine-datatable';
import clsx from 'clsx';
import classes from './Makes.module.css';
import useMakes from './useMakes';
import CustomButton from '@/components/CustomButton';
import AddMake from './AddMake';
import { useState } from 'react';
import AddModel from './AddModel';
import AddVariant from './AddVarient';

export default function Makes() {
    const {
        makesData,
        transformedMakesData,
        filteredData,
        typeOptions,
        searchQuery,
        selectedType,
        expandedMakeIds,
        expandedModelIds,
        isMakeModalOpen,
        isModelModalOpen,
        isVariantModalOpen,
        setIsVariantModalOpen,
        setSearchQuery,
        setSelectedType,
        setExpandedMakeIds,
        setExpandedModelIds,
        setIsMakeModalOpen,
        setIsModelModalOpen,
        getTypeIcon,
        handleDelete,
        handleEdit,
        handleModelClick,
        handleEditForModel,
        handleEditForVariant,
        handleDeleteModel,
        // handleDeleteVariant
    } = useMakes();

    const [selectedMake, setSelectedMake] = useState(null);
    const [selectedModel, setSelectedModel] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState(null);

    console.log("selectedModelselectedModel", selectedModel)
    return (
        <Box>
            <Box p="md" bg="white" sx={{ borderRadius: 8 }}>
                <Group position="apart" align="center">
                    <Group spacing="sm">
                        <TextInput
                            placeholder="Search makes..."
                            icon={<IconSearch size={16} />}
                            sx={{ width: 250 }}
                            value={searchQuery}
                            onChange={(event) => setSearchQuery(event.currentTarget.value)}
                        />
                        <Select
                            placeholder="All Types"
                            data={[
                                { value: 'all', label: 'All Types' },
                                { value: 'car', label: 'Car' },
                                { value: 'bike', label: 'Bike' },
                                { value: 'truck', label: 'Truck' }
                            ]}
                            value={selectedType}
                            onChange={(value) => {
                                setSelectedType(value === 'all' ? '' : value);
                            }}
                            sx={{ width: 200 }}
                        />
                    </Group>

                    <Group spacing="sm">
                        <Select
                            placeholder="Actions"
                            data={[
                                { value: 'make', label: 'Add Make' },
                                { value: 'model', label: 'Add Model' },
                                { value: 'variant', label: 'Add Variant' }
                            ]}
                            onChange={(value) => {
                                switch (value) {
                                    case 'make':
                                        setIsMakeModalOpen(true);
                                        break;
                                    case 'model':
                                        setIsModelModalOpen(true);
                                        break;
                                    case 'variant':
                                        setIsVariantModalOpen(true);
                                        break;
                                    default:
                                        break;
                                }
                            }}
                            sx={{ width: 200 }}
                        />
                        {<AddMake
                            open={isMakeModalOpen}
                            setOnClose={setIsMakeModalOpen}
                            editData={selectedMake}
                        />}
                        <AddModel
                            open={isModelModalOpen}
                            setOnClose={setIsModelModalOpen}
                            editData={selectedModel}
                        />
                        <AddVariant
                            open={isVariantModalOpen}
                            setOnClose={setIsVariantModalOpen}
                            editData={selectedVariant}
                        />

                    </Group>
                </Group>
            </Box>
            <DataTable
                withTableBorder
                withColumnBorders
                highlightOnHover
                columns={[
                    {
                        accessor: 'name',
                        title: 'Make / Model / Variant',
                        width: 300,
                        render: ({ _id, name, type, companyImage }) => (
                            <Group gap="sm">
                                <IconChevronRight
                                    className={clsx(classes.icon, classes.expandIcon, {
                                        [classes.expandIconRotated]: expandedMakeIds.includes(_id),
                                    })}
                                />
                                <Box w={24} h={24} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {companyImage && (
                                        <Image
                                            src={companyImage}
                                            // alt={name}
                                            fit="contain"
                                            className={classes.logo}
                                            styles={{
                                                image: {
                                                    maxWidth: '100%',
                                                    maxHeight: '100%',
                                                    objectFit: 'contain'
                                                }
                                            }}
                                        />
                                    )}
                                </Box>
                                <span>{name}</span>
                            </Group>
                        ),
                    },
                    {
                        accessor: 'type',
                        title: 'Type',
                        width: 100,
                    },
                    {
                        accessor: 'models',
                        title: 'Models Count',
                        textAlign: 'right',
                        width: 120,
                        render: ({ models }) => models?.length || 0
                    },
                    {
                        accessor: 'actions',
                        title: 'Actions',
                        textAlign: 'right',
                        width: 100,
                        render: (make) => (
                            <Group gap={4} justify="right">
                                <ActionIcon
                                    variant="subtle"
                                    color="blue"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedMake({
                                            _id: make._id,
                                            name: make.name,
                                            type: make.type,
                                            description: make.description,
                                            companyImage: make.companyImage
                                        });
                                        handleEdit(make, 'make');

                                        // setIsMakeModalOpen(true);
                                    }}
                                >
                                    <IconEdit size={16} />
                                </ActionIcon>
                                <ActionIcon
                                    variant="subtle"
                                    color="red"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteModel(make._id, 'make');
                                    }}
                                >
                                    <IconTrash size={16} />
                                </ActionIcon>
                            </Group>
                        ),
                    },
                ]}
                records={transformedMakesData?.data}
                rowExpansion={{
                    allowMultiple: true,
                    expanded: { recordIds: expandedMakeIds, onRecordIdsChange: setExpandedMakeIds },
                    content: (make) => (
                        <DataTable
                            noHeader
                            withColumnBorders
                            columns={[
                                {
                                    accessor: 'name',
                                    width: 300,
                                    render: ({ _id, name }) => (
                                        <Box component="span" ml={20}>
                                            <IconChevronRight
                                                className={clsx(classes.icon, classes.expandIcon, {
                                                    [classes.expandIconRotated]: expandedModelIds.includes(_id),
                                                })}
                                            />
                                            <span>{name}</span>
                                        </Box>
                                    ),
                                },
                                {
                                    accessor: 'key',
                                    title: 'Slug',
                                    width: 120,
                                },
                                {
                                    accessor: 'variants',
                                    textAlign: 'right',
                                    width: 120,
                                    render: ({ variants }) => variants?.length || 0
                                },
                                {
                                    accessor: 'modelActions',
                                    textAlign: 'right',
                                    width: 120,
                                    render: (model) => (
                                        <Group gap={4} justify="right">
                                            <ActionIcon
                                                variant="subtle"
                                                color="green"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleModelClick(model);
                                                }}
                                            >
                                                <IconCheck size={16} />
                                            </ActionIcon>
                                            <ActionIcon
                                                variant="subtle"
                                                color="blue"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    // Here we're getting the make data from the parent record
                                                    setSelectedModel({
                                                        ...model,
                                                        makeId: make.record._id,  // Add the make ID
                                                        type: make.record.type,    // Add the make type
                                                        make: {
                                                            _id: make.record._id,
                                                            name: make.record.name,
                                                            type: make.record.type
                                                        }
                                                    });
                                                    handleEditForModel(model, 'model');
                                                }}
                                            >
                                                <IconEdit size={16} />
                                            </ActionIcon>
                                            <ActionIcon
                                                variant="subtle"
                                                color="red"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteModel(model._id, make.record._id);
                                                }}
                                            >
                                                <IconTrash size={16} />
                                            </ActionIcon>
                                        </Group>
                                    )
                                },
                            ]}
                            records={make.record.models}
                            rowExpansion={{
                                allowMultiple: true,
                                expanded: { recordIds: expandedModelIds, onRecordIdsChange: setExpandedModelIds },
                                content: (model) => (
                                    <DataTable
                                        noHeader
                                        withColumnBorders
                                        columns={[
                                            {
                                                accessor: 'variant',
                                                width: 300,
                                                render: ({ variant }) => (
                                                    <Box component="span" ml={40}>
                                                        {variant}
                                                    </Box>
                                                ),
                                            },
                                            {
                                                accessor: 'variantActions',
                                                textAlign: 'right',
                                                width: 100,
                                                render: ({ variant }) => (
                                                    <Group gap={4} justify="right">
                                                        <ActionIcon
                                                            variant="subtle"
                                                            color="blue"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleEditForVariant({ variant }, 'variant');
                                                                setSelectedVariant({
                                                                    name: variant,
                                                                    makeId: make.record._id,  // Add the make ID
                                                                    type: make.record.type,    // Add the make type
                                                                    make: {
                                                                        _id: make.record._id,
                                                                        name: make.record.name,
                                                                        type: make.record.type
                                                                    },

                                                                    model: {
                                                                        _id: model.record._id,
                                                                        name: model.record.name,
                                                                    }
                                                                })
                                                            }}
                                                        >
                                                            <IconEdit size={16} />
                                                        </ActionIcon>
                                                        <ActionIcon
                                                            variant="subtle"
                                                            color="red"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleDelete(variant, 'variant');
                                                            }}
                                                        >
                                                            <IconTrash size={16} />
                                                        </ActionIcon>
                                                    </Group>
                                                ),
                                            },
                                        ]}
                                        records={model.record.variants.map(variant => ({ variant }))}
                                    />
                                ),
                            }}
                        />
                    ),
                }}
            />
        </Box>
    );
}