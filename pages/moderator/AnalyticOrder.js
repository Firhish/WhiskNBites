import { Component } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { BarChart } from 'react-native-charts-wrapper';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import moment from "moment";

class AnalyticOrder extends Component {

    state = {

        totalRevenue: 0,
        archivedOrdersaArr: [],

    }

    setTotalRevenue = (totalRevenue) => {

        this.setState({ totalRevenue })

    }

    setArchivedOrdersaArr = (archivedOrdersaArr) => {

        this.setState({ archivedOrdersaArr })

    }

    getData = () => {

        database()
            .ref('/Archived_Orders')
            .on('value', (snapshot) => {
                if (snapshot.exists()) {

                    let data = [];
                    snapshot.forEach((child) => {
                        temp = child.val()
                        temp.id = child.key
                        data.push(temp)
                        this.setArchivedOrdersaArr(data)
                    })

                }
                else {
                    return null
                }
            });


    }

    componentDidMount() {
        this.getData()
    }


    getSalesEachMonth = (prevMonthIndex) => {

        const currentDate = new Date();
        const previousMonth = (currentDate.getMonth() - prevMonthIndex + 12) % 12;
        const previousYear = currentDate.getFullYear() - (previousMonth === 11 ? 1 : 0);
        const { archivedOrdersaArr } = this.state
        let sum = 0


        for (i = 0; i < archivedOrdersaArr.length; i++) {

            let itemMonth = moment(archivedOrdersaArr[i].timestamp).month()
            let itemYear = moment(archivedOrdersaArr[i].timestamp).year()

            if (itemMonth === previousMonth && itemYear === previousYear) {

                sum = sum + archivedOrdersaArr[i].totalPayment

            }


        }

        return sum

    }

    getSoldUnits = () => {

        let cartArr = []
        let sum = 0
        const { archivedOrdersaArr } = this.state

        for (i = 0; i < archivedOrdersaArr.length; i++) {

            cartArr.push(archivedOrdersaArr[i].cart)

        }

        for (i = 0; i < cartArr.length; i++) {

            for (j = 0; j < cartArr[i].length; j++) {

                sum = sum + cartArr[i][j].quantity

            }

        }

        return sum

    }



    render() {

        return (
            <ScrollView style={{ padding: 10 }}>
                <Text style={styles.dealText}>This Month Sales</Text>
                <View style={styles.upper}>
                    <View style={styles.upperLayer}>
                        <View style={styles.upperSingleBox}>
                            <Text style={styles.resultText}>{this.getSoldUnits()}</Text>
                            <Text>SOLD UNITS</Text>
                        </View>
                        <View style={styles.upperSingleBox}>
                            <Text style={styles.resultText}>{'RM ' + Number(this.getSalesEachMonth(0)).toFixed(2)}</Text>
                            <Text>TOTAL REVENUE</Text>
                        </View>
                    </View>
                    <View style={styles.upperLayer}>
                        <View style={styles.upperSingleBox}>
                            <Text style={styles.resultText}>RM 2800.50</Text>
                            <Text>NET PROFIT</Text>
                        </View>
                        <View style={styles.upperSingleBox}>
                            <Text style={styles.resultText}>23%</Text>
                            <Text>PROFIT MARGIN</Text>
                        </View>
                    </View>
                </View>
                <Text style={[styles.dealText,]}>Last 5 Months</Text>
                <View style={styles.container}>
                    <BarChart style={styles.chart}
                        data={{ dataSets: [{ label: "sales", values: [{ y: this.getSalesEachMonth(4) }, { y: this.getSalesEachMonth(3) }, { y: this.getSalesEachMonth(2) }, { y: this.getSalesEachMonth(1) }, { y: this.getSalesEachMonth(0) },] }] }}
                    />
                </View>
            </ScrollView>
        )
    }
}

export default AnalyticOrder

const styles = StyleSheet.create({


    upper: {
        width: '100%',
        marginBottom: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    upperLayer: {
        width: '95%',
        height: 150,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 4,
    },
    upperSingleBox: {
        backgroundColor: 'white',
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 4,
        borderRadius: 5,
        padding: 12,
        height: 150,

    },
    resultText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#DB9B06',
        marginBottom: 10,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        height: 300,
        width: '100%',
        marginBottom: 20,
        padding: 12,
        borderRadius: 5,

    },
    chart: {
        flex: 1,
        backgroundColor: 'white',
    },
    dealText: {
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 15,
    },

})