import React, { useEffect, useState } from "react";
import { Alert, ScrollView, View } from "react-native";

import { CustomButton, CustomSpacer, CustomTable, SafeAreaPage } from "../../../components";
import { ONBOARDING_ROUTES } from "../../../constants";
import { SAMPLE_PRODUCTS } from "../../../mocks/products";
import {
  colorBlue,
  colorGreen,
  flexChild,
  flexRow,
  fs16SemiBoldBlack6,
  fs18SemiBoldBlack6,
  fsCapitalize,
  fullHW,
  sh15,
  sw107,
  sw109,
  sw115,
  sw125,
  sw289,
  sw36,
  sw63,
  sw83,
} from "../../../styles";
import { ProductGraph } from "./Graph";
import { ProductHeader } from "./Header";
import { ProductOptions } from "./Options";

interface ProductsProps {
  handleNextStep: (route: string) => void;
}

export const Products = ({ handleNextStep }: ProductsProps) => {
  const [activeAccordion, setActiveAccordion] = useState<number[]>([]);
  const [productList, setProductList] = useState<ITableData[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ITableData[]>([]);

  const handleSubmit = () => {
    handleNextStep(ONBOARDING_ROUTES.Address);
  };

  const handlePress = () => {
    Alert.alert("handlePress");
  };

  const handleSelectProduct = (product: ITableData[]) => {
    let newSelected = product === productList ? product : [...selectedProduct];
    if (product.length === 0) {
      newSelected = [];
    }
    if (product.length === 1) {
      const sectionIndex = newSelected.indexOf(product[0]);
      if (sectionIndex > -1) {
        newSelected.splice(sectionIndex, 1);
      } else {
        newSelected.push(product[0]);
      }
    }
    setSelectedProduct(newSelected);
  };

  const handleShowPerformance = (item: IColumnItemAccordion) => {
    if (item.key === "performance") {
      const newSections: number[] = [...activeAccordion];
      const sectionIndex = newSections.indexOf(item.index);
      if (sectionIndex > -1) {
        newSections.splice(sectionIndex, 1);
      } else {
        newSections.push(item.index);
      }
      setActiveAccordion(newSections);
    }
  };

  const handleRiskStyle = (item: IColumnItemAccordion) => {
    switch (item.value.toUpperCase()) {
      case "LOW":
        return { ...fs16SemiBoldBlack6, color: colorGreen._1 };
      case "MEDIUM":
        return { ...fs16SemiBoldBlack6, color: colorBlue._7 };
      case "HIGH":
        return { ...fs16SemiBoldBlack6, color: "red" };
      default:
        return {};
    }
  };

  const columns: ITableColumn[] = [
    {
      key: "name",
      itemTextStyle: () => {
        return { ...fs18SemiBoldBlack6, ...fsCapitalize };
      },
      textStyle: {
        width: sw289,
      },
      title: "Name",
      type: "checkbox",
    },
    {
      key: "type",
      textStyle: {
        width: sw109,
      },
      title: "Product",
    },
    {
      itemTextStyle: handleRiskStyle,
      key: "risk",
      textStyle: {
        width: sw125,
      },
      title: "Risk Score",
    },
    {
      key: "epf",
      textStyle: {
        width: sw83,
      },
      title: "EPF",
    },
    {
      key: "shariah",
      textStyle: {
        width: sw107,
      },
      title: "Shariah",
    },
    {
      key: "performance",
      textStyle: {
        width: sw115,
      },
      title: "Performance",
      onPressItem: handleShowPerformance,
      viewStyle: {
        height: "100%",
        alignItems: "center",
      },
    },
  ];

  const RenderAccordion = (item: ITableData) => {
    return <ProductGraph item={item} />;
  };

  const RenderOptions = (item: ITableData) => {
    return <ProductOptions item={item} />;
  };

  useEffect(() => {
    // TODO integration
    setProductList(SAMPLE_PRODUCTS);
  }, []);

  return (
    <SafeAreaPage>
      <ScrollView style={flexChild}>
        <View style={{ ...flexRow, ...fullHW }}>
          <View>
            <ProductHeader handleNext={handlePress} handlePrev={handlePress} handleRecommended={handlePress} handleViewAll={handlePress} />
            <CustomSpacer space={sh15} />
            <View style={flexRow}>
              <CustomSpacer isHorizontal={true} space={sw63} />
              <View>
                <CustomTable
                  activeAccordion={activeAccordion}
                  columns={columns}
                  data={productList}
                  rowSelection={selectedProduct}
                  onRowSelect={handleSelectProduct}
                  RenderAccordion={RenderAccordion}
                  RenderOptions={RenderOptions}
                />
              </View>
              <CustomSpacer isHorizontal={true} space={sw36} />
            </View>
            <CustomButton onPress={handleSubmit} text="Submit" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaPage>
  );
};