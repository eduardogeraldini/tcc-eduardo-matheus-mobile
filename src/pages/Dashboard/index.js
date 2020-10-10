import React, { useEffect, useState } from "react";
import { BarChart, PieChart, XAxis, Grid } from "react-native-svg-charts";

import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { View, Text, ScrollView, Alert } from "react-native";

import api from "./../../services/api";
import { formatShowMoney } from './../../services/utils';

import styles from "./styles";

export default function ClientDashboard() {
  const navigation = useNavigation();

  const [higherCategorySpending, setHigherCategorySpending] = useState([]);
  const [movimentsChart, setMovimentsChart] = useState([]);

  const [percentCurrentLiquidity, setPercentCurrentLiquidity] = useState(0);
  const [currentLiquidity, setCurrentLiquidity] = useState(0);

  const [percentProjectedLiquidity, setPercentProjectedLiquidity] = useState(0);
  const [projectedLiquidity, setProjectedLiquidity] = useState(0);

  useEffect(() => {

    (async () => {
      const { data: { percentcurrentliquidity, currentliquidity} } = await api.get("/client-dashboard/current-liquidity");

      setPercentCurrentLiquidity(percentcurrentliquidity);
      setCurrentLiquidity(currentliquidity)

    })();

    (async () => {
      const { data: { percentprojectedliquidity, projectedliquidity} } = await api.get("/client-dashboard/projected-liquidity");

      setPercentProjectedLiquidity(percentprojectedliquidity);
      setProjectedLiquidity(projectedliquidity)

    })();

  },[]);

  useEffect(() => {

    (async () => {
      const { data } = await api.get("/client-dashboard/higher-category-spending");

      const pieChart = data.higherCategorySpending
        .map((value, index) => ({
          value: value.total,
          svg: {
            fill: value.color,
            onPress: () => Alert.alert('Descrição', 'Categoria: ' + value.name + '\nR$ ' + formatShowMoney(value.total)),
          },
          key: `pie-${index}`,
       })
      );

      setHigherCategorySpending(pieChart);

    })();

  },[]);

  useEffect(() => {

    (async () => {
      const { data: revenuesData } = await api.get("/client-dashboard/2");
      const { data: expensesData } = await api.get("/client-dashboard/1");

      const label = [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro'
      ];

      const revenues = revenuesData
        .map((value, index) => ({
          value,
          svg: {
            fill: "#01B075",
            onPress: () => Alert.alert('Descrição - Receita', 'Mês de referência: ' + label[index] + '\nR$ ' + formatShowMoney(value)),
          },
          key: `${index}`,
        })
      );

      const expenses = expensesData
        .map((value, index) => ({
          value,
          svg: {
            fill: "#EF544B",
            onPress: () => Alert.alert('Descrição - Despesa', 'Mês de referência: ' + label[index] + '\nR$ ' + formatShowMoney(value)),
          },
          key: `${index}`,
        })
     );
    
      const barData = [
        {
          data: revenues,
        },
        {
          data: expenses,
        },
      ];

      setMovimentsChart(barData);

    })();

  },[]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.info_container}>
        <View style={[styles.info_details, { paddingTop: 0 }]}>
          <View>
            <Text style={styles.info_details_title}>Liquidez Atual</Text>
            <Text style={styles.info_details_value}>R$ {formatShowMoney(currentLiquidity)}</Text>
            <View style={{ flexDirection: "row" }}>
              <Feather
                name={percentCurrentLiquidity > 0 ? "arrow-up-right" : percentCurrentLiquidity < 0 ? "arrow-up-left" : "align-justify"}
                size={17}
                style={percentCurrentLiquidity > 0 ? styles.icon_info_percent_green : percentCurrentLiquidity < 0 ? styles.icon_info_percent_red : ''}
              />
              <Text style={percentCurrentLiquidity > 0 ? styles.info_details_percent_green : percentCurrentLiquidity < 0 ? styles.info_details_percent_red : ''}>{formatShowMoney(percentCurrentLiquidity)} %</Text>
            </View>
          </View>
          <View>
            <Text style={styles.info_details_title}>Liquidez Projetada</Text>
            <Text style={styles.info_details_value}>R$ {formatShowMoney(projectedLiquidity)}</Text>
            <View style={{ flexDirection: "row" }}>
              <Feather
                name={percentProjectedLiquidity > 0 ? "arrow-up-right" : percentProjectedLiquidity < 0 ? "arrow-up-left" : "align-justify"}
                size={17}
                style={percentProjectedLiquidity > 0 ? styles.icon_info_percent_green : percentProjectedLiquidity < 0 ? styles.icon_info_percent_red : ''}
              />
              <Text style={percentProjectedLiquidity > 0 ? styles.info_details_percent_green : percentProjectedLiquidity < 0 ? styles.info_details_percent_red : ''}>{formatShowMoney(percentProjectedLiquidity)} %</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.info_container}>
        <View style={styles.bar_header}>
          <Text style={styles.bar_title}>Receitas x Despesas por mês</Text>
        </View>
        <BarChart
          yAccessor={({ item }) => item.value}
          style={{ height: 230, marginHorizontal: 20 }}
          data={movimentsChart}
          contentInset={{ top: 10, bottom: 10 }}
        >
          <Grid />
        </BarChart>
        <View style={styles.bar_footer}>
          <View style={styles.bar_block_green} />
          <Text style={styles.bar_labels}>Receitas</Text>
          <View style={styles.bar_block_red} />
          <Text style={styles.bar_labels}>Despesas</Text>
        </View>
      </View>

      <View style={[styles.info_container, { marginBottom: 10 }]}>
        <View style={styles.bar_header}>
          <Text style={styles.bar_title}>Top 5 categorias com mais gastos</Text>
        </View>
        <PieChart style={{ height: 180, marginVertical: 10 }} data={higherCategorySpending} />
      </View>

    </ScrollView>
  );
}
