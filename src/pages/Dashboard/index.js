import React, { useEffect, useState } from "react";
import { BarChart, PieChart, XAxis, Grid } from "react-native-svg-charts";

import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { View, Text, ScrollView, Alert } from "react-native";

import api from "./../../services/api";

import styles from "./styles";

export default function ClientDashboard() {
  const navigation = useNavigation();

  const [higherCategorySpending, setHigherCategorySpending] = useState([]);

  const [movimentsChart, setMovimentsChart] = useState([]);

  useEffect(() => {

    (async () => {
      const { data } = await api.get("/client-dashboard/higher-category-spending");

      const pieChart = data.higherCategorySpending
        .map((value, index) => ({
          value: value.total,
          svg: {
            fill: value.color,
            onPress: () => Alert.alert('Descrição', 'Categoria: ' + value.name + '\nR$ ' + value.total),
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
        'Outobro',
        'Novembro',
        'Dezembro'
      ];

      const revenues = revenuesData
        .map((value, index) => ({
          value,
          svg: {
            fill: "#01B075",
            onPress: () => Alert.alert('Descrição - Receita', 'Mês de referência: ' + label[index] + '\nR$ ' + value),
          },
          key: `${index}`,
        })
      );

      const expenses = expensesData
        .map((value, index) => ({
          value,
          svg: {
            fill: "#EF544B",
            onPress: () => Alert.alert('Descrição - Despesa', 'Mês de referência: ' + label[index] + '\nR$ ' + value),
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
            <Text style={styles.info_details_value}>R$ 1.180,00</Text>
            <View style={{ flexDirection: "row" }}>
              <Feather
                name="arrow-up-right"
                size={17}
                style={styles.icon_info_percent}
              />
              <Text style={styles.info_details_percent}>+62,52%</Text>
            </View>
          </View>
          <View>
            <Text style={styles.info_details_title}>Liquidez Projetada</Text>
            <Text style={styles.info_details_value}>R$ -2.280,00</Text>
            <View style={{ flexDirection: "row" }}>
              <Feather
                name="arrow-down-left"
                size={17}
                style={styles.icon_info_percent_red}
              />
              <Text style={styles.info_details_percent_red}>+112,45%</Text>
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
