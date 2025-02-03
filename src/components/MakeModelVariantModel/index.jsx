import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Center,
  CloseButton,
  Flex,
  Grid,
  Image,
  Input,
  List,
  Modal,
  Paper,
  ScrollArea,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { BsArrowRight, BsSearch } from "react-icons/bs";
import { useGetMakesQuery } from "@/services/make";

const MakeModelVariantModel = ({
  isOpen,
  type,
  onClose: closeModal,
  selection,
  setSelection,
  fetchMakesByTypeData,
  hide = false,
}) => {
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState({});
  const [variants, setVariants] = useState({});
  const [activeTab, setActiveTab] = useState("make"); // State to track active tab
  const {data:makesData} = useGetMakesQuery({type})

  useEffect(() => {
    const fetchedMakes = [];
    const fetchedModels = {};
    const fetchedVariants = {};
    makesData?.data?.forEach((make) => {
      fetchedMakes.push(make.name);
      fetchedModels[make.name] = [];
      make.models.forEach((model) => {
        fetchedModels[make.name].push(model.name);
        fetchedVariants[model.name] = model.variants;
      });
    });
    
    setMakes(fetchedMakes);
    setModels(fetchedModels);
    setVariants(fetchedVariants);
  }, [makesData]);
  
  const [makeSearch, setMakeSearch] = useState("");
  const [modelSearch, setModelSearch] = useState("");
  const [variantSearch, setVariantSearch] = useState("");

  const filteredMakes = makes.filter((make) =>
    make?.toLowerCase().includes(makeSearch?.toLowerCase())
  );

  const filteredModels =
    selection.make && models[selection.make]
      ? models[selection.make].filter((model) =>
          model?.toLowerCase().includes(modelSearch?.toLowerCase())
        )
      : [];

  const filteredVariants =
    selection.model && variants[selection.model]
      ? variants[selection.model].filter((variant) =>
          variant?.toLowerCase().includes(variantSearch?.toLowerCase())
        )
      : [];

  const [opened, { open, close }] = useDisclosure(isOpen);
  const handleSelection = (type, value) => {
    setSelection((prev) => {
      const updatedSelection = { ...prev, [type]: value };

      if (type === "make") {
        setActiveTab("model"); // Set active tab to model
        return {
          ...updatedSelection,
          model: "", // Reset model and variant
          variant: "",
        };
      }

      if (type === "model") {
        setActiveTab("variant"); // Set active tab to variant
        hide && closeModal();
        return {
          ...updatedSelection,
          variant: "", // Reset variant
        };
      }

      if (type === "variant") {
        closeModal();
        return {
          ...updatedSelection,
        };
      }
      return updatedSelection;
    });
  };

  useEffect(() => {
    if (isOpen) open();
    else close();
  }, [isOpen, open, close]);

  useEffect(() => {
    () => {
      return closeModal();
    };
  }, [selection]);

  return (
    <Modal
      opened={isOpen}
      onClose={closeModal}
      withCloseButton={false}
      size={"xl"}
      padding={0}
      closeOnClickOutside={false} // Prevent modal from closing on outside click
    >
      <Paper
        className="search-modal-header"
        p="xs"
        shadow="0px 2px 5px 0px #00000014"
      >
        <Center>
          <Button
            className={`tab-button ${activeTab === "make" ? "active" : ""}`}
            variant="subtle"
            bg={activeTab === "make" ? "#E90808" : "#F3F3F3"}
            color={activeTab === "make" ? "white" : "#878787"}
            size="xs"
            mr="md"
            autoContrast
            onClick={() => {
              setActiveTab("make");
              if (selection.make) {
                setSelection((prev) => ({ ...prev, make: selection.make }));
              }
            }}
          >
            Make
          </Button>
          <Button
            className={`tab-button ${activeTab === "model" ? "active" : ""}`}
            variant="subtle"
            bg={activeTab === "model" ? "#E90808" : "#F3F3F3"}
            color={activeTab === "model" ? "white" : "#878787"}
            size="xs"
            mr="md"
            autoContrast
            onClick={() => {
              setActiveTab("model");
              if (selection.model) {
                setSelection((prev) => ({ ...prev, model:selection.model  }));
              }
            }}
          >
            Model
          </Button>
          {!hide && ( // Conditionally render Variants tab button
            <Button
              className={`tab-button ${
                activeTab === "variant" ? "active" : ""
              }`}
              variant="subtle"
              bg={activeTab === "variant" ? "#E90808" : "#F3F3F3"}
              color={activeTab === "variant" ? "white" : "#878787"}
              size="xs"
              mr="md"
              autoContrast
              onClick={() => {
                setActiveTab("variant");
                if (selection.variant) {
                  setSelection((prev) => ({ ...prev, variant:selection.variant  }));
                }
              }}
            >
              Variants
            </Button>
          )}
          <CloseButton pos="absolute" right={20} onClick={closeModal} />
        </Center>
      </Paper>
      <Grid gutter={0}>
        <Grid.Col span={hide ? 6 : 4} p="md" pt="xl" className="border-end">
          {/* Make Section */}
          <Input
            placeholder="Search by Car Make"
            leftSection={<BsSearch />}
            value={makeSearch}
            onChange={(e) => setMakeSearch(e.target.value)}
          />
          <Title order={5} my="sm" fw={600}>
            Popular
          </Title>
          <ScrollArea
            h={250}
            offsetScrollbars
            scrollbarSize={5}
            scrollHideDelay={500}
            scrollbars="y"
          >
            <List className="search-dropdown-lists" listStyleType="none">
              {filteredMakes.map((make) => (
                <List.Item
                  key={make}
                  className={`search-dropdown-lists__item ${
                    selection.make === make ? "selected" : ""
                  }`}
                  icon={
                    <Image
                      src={`/megamenu/search-menu/${make?.toLowerCase()}-sm.svg`}
                    />
                  }
                  onClick={() => {
                    handleSelection("make", make);
                    setActiveTab("model"); // Set active tab to model
                  }}
                >
                  {make} <BsArrowRight />
                </List.Item>
              ))}
            </List>
          </ScrollArea>
        </Grid.Col>
        <Grid.Col span={hide ? 6 : 4} p="md" pt="xl" className="border-end">
          {/* Model Section */}
          <Input
            placeholder="Search by Car Model"
            leftSection={<BsSearch />}
            value={modelSearch}
            onChange={(e) => setModelSearch(e.target.value)}
          />
          <Title order={5} my="sm" fw={600}>
            All Models
          </Title>
          <ScrollArea
            h={250}
            offsetScrollbars
            scrollbarSize={5}
            scrollHideDelay={500}
            scrollbars="y"
          >
            <List className="search-dropdown-lists" listStyleType="none">
              {selection.make &&
                filteredModels.map((model) => (
                  <List.Item
                    key={model}
                    className={`search-dropdown-lists__item ${
                      selection.model === model ? "selected" : ""
                    }`}
                    onClick={() => {
                      handleSelection("model", model);
                      setActiveTab("variant"); // Set active tab to variant
                    }}
                  >
                    {model} <BsArrowRight />
                  </List.Item>
                ))}
            </List>
          </ScrollArea>
        </Grid.Col>
        {!hide && ( // Conditionally render Variants column
          <Grid.Col span={4} p="md" pt="xl" className="border-end">
            <Input
              placeholder="Search by Car Variant"
              leftSection={<BsSearch />}
              value={variantSearch}
              onChange={(e) => setVariantSearch(e.target.value)}
            />
            <Title order={5} my="sm" fw={600}>
              Variants
            </Title>
            <ScrollArea
              offsetScrollbars
              scrollbarSize={5}
              scrollHideDelay={500}
              scrollbars="y"
            >
              <List className="search-dropdown-lists" listStyleType="none">
                {selection.model &&
                  filteredVariants.map((variant) => (
                    <List.Item
                      key={variant}
                      className={`search-dropdown-lists__item ${
                        selection.variant === variant ? "selected" : ""
                      }`}
                      onClick={() => {
                        handleSelection("variant", variant);
                        setActiveTab("variant"); // Set active tab to variant
                      }}
                    >
                      {variant} <BsArrowRight />
                    </List.Item>
                  ))}
              </List>
            </ScrollArea>
          </Grid.Col>
        )}
      </Grid>
      <Paper
        withBorder
        className="search-modal-footer"
        p="xs"
        px="md"
        radius={0}
        shadow="none"
        ta="right"
      >
        <Button
          color="#E90808"
          rightSection={<BsArrowRight />}
          onClick={closeModal}
          ff="heading"
        >
          Done
        </Button>
      </Paper>
    </Modal>
  );
};

export default MakeModelVariantModel;
