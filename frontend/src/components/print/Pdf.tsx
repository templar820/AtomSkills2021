import React, {useEffect} from 'react';
import arial from "./fonts/Arial.ttf";
import timesNewRomanBold from "./fonts/TimesNewRomanBold.ttf"
import timesNewRoman from "./fonts/TimesNewRoman.ttf"
import { Page, Text, View, Document, StyleSheet, Font} from '@react-pdf/renderer';
Font.register({ family: 'Arial', format: "truetype", src: arial });
Font.register({ family: 'TimesNewRoman', format: "truetype", src: timesNewRomanBold, fontWeight: 'bold' });
Font.register({ family: 'TimesNewRoman', format: "truetype", src: timesNewRoman, fontWeight: 'normal' });

const styles = StyleSheet.create({
  page: {
    paddingTop: 70,
    paddingLeft: 30,
    paddingRight: 30,
    fontSize: 10,
    fontFamily: "TimesNewRoman"
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center"
  },
  table: {
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
    borderStyle: "solid",
    borderBottomWidth: 1,
  },
  tableTitle: {
    fontWeight: 'bold',
    paddingRight: 3,
  },
  tableCell: {
    display: "flex",
    flexDirection: "row",
    flexWrap: 'wrap',
    width: '50%',
    borderStyle: "solid",
    borderRightWidth: 1,
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 6,
  },
  tableSpecCell1: {
    textAlign: 'center',
    width: 170,
  },
  tableSpecCell2: {
    textAlign: 'center',
    width: 50,
  },
  tableSpecCell3: {
    textAlign: 'center',
    width: 50,
  },
  tableSpecCell4: {
    textAlign: 'center',
    width: 70,
  },
  tableSpecCell5: {
    flexGrow: 1,
    width: 'auto'
  },
  tableSpecTitle: {
    backgroundColor: '#eee'
  },
  spec: {
    textAlign: 'center',
    borderRight: 1,
    paddingTop: 10,
    paddingBottom: 10,
  },
  descriptions: {
    borderRight: 1,
    height: 100,
    padding: 6,
  },
  tableCostCell1: {
    width: 200,
  },
  tableCostCell2: {
    flexGrow: 1,
    width: 'auto'
  }



});

const OrderPdf = () => {

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.title}>???????????? ???? ?????????????????? ?????????? ??? 222 ???? 01.01.2021</Text>
        </View>
        <View style={[styles.table]}>
          <View style={styles.tableRow}>
            <View style={[styles.tableCell]}><Text>????????????????</Text></View>
            <View style={[styles.tableCell]}><Text>????????????????????</Text></View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableCell]}>
              <Text style={[styles.tableTitle]}>????????????????????????:</Text>
              <Text>???????? "?????? ????????????????"</Text>
            </View>
            <View style={[styles.tableCell]}>
              <Text style={[styles.tableTitle]}>????????????????????????:</Text>
              <Text>???? "????????????"</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableCell]}>
              <Text style={[styles.tableTitle]}>?????????? ?????????? ??????????????????????:</Text>
              <Text>???????????????????? ??????., 11, ????????????, 109451"</Text>
            </View>
            <View style={[styles.tableCell]}>
              <Text style={[styles.tableTitle]}>?????????? ?????????? ??????????????????????:</Text>
              <Text>????. ????????????????????, 1, ??????. 5, ????????????, 127018</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableCell]}>
              <Text style={[styles.tableTitle]}>??????:</Text>
              <Text>74524543234</Text>
            </View>
            <View style={[styles.tableCell]}>
              <Text style={[styles.tableTitle]}>??????????????????????????:</Text>
              <Text>?????????????????? ???????????? ??????????????????</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableCell]}>
              <Text style={[styles.tableTitle]}>??????????????????????????:</Text>
              <Text>???????????? ???????? ??????????????????</Text>
            </View>
            <View style={[styles.tableCell]}>
              <Text style={[styles.tableTitle]}>??????????????:</Text>
              <Text>+79196578245</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableCell]}>
              <Text style={[styles.tableTitle]}>??????????????:</Text>
              <Text>+79515874287</Text>
            </View>
            <View style={[styles.tableCell]}>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableCell]}>
              <Text style={[styles.tableTitle]}>E-mail:</Text>
              <Text>petrov@mail.ru</Text>
            </View>
            <View style={[styles.tableCell]}>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableCell]}>
              <Text style={[styles.tableTitle]}>???????? ??????????????????????:</Text>
              <Text>01.01.2021,</Text>
            </View>
            <View style={[styles.tableCell]}>
              <Text style={[styles.tableTitle]}>???????? ????????????????:</Text>
              <Text>01.01.2021</Text>
            </View>
          </View>
          <View style={[styles.tableRow, styles.spec]}>
            <Text>???????????????????????? ????????????</Text>
          </View>
          <View style={[styles.tableRow]}>
            <View style={[styles.tableCell, styles.tableSpecCell1, styles.tableSpecTitle]}>
              <Text style={[styles.tableTitle]}>????????????????????????</Text>
            </View>
            <View style={[styles.tableCell, styles.tableSpecCell2, styles.tableSpecTitle]}>
              <Text style={[styles.tableTitle]}>??????-????</Text>
            </View>
            <View style={[styles.tableCell, styles.tableSpecCell3, styles.tableSpecTitle]}>
              <Text style={[styles.tableTitle]}>??????, ????</Text>
            </View>
            <View style={[styles.tableCell, styles.tableSpecCell4, styles.tableSpecTitle]}>
              <Text style={[styles.tableTitle]}>??????????, ??3</Text>
            </View>

            Nick Chikovani, [13.08.21 23:32]
            <View style={[styles.tableCell, styles.tableSpecCell5, styles.tableSpecTitle]}>
              <Text style={[styles.tableTitle]}>???????????? ????????????????????</Text>
            </View>
          </View>
          <View style={[styles.tableRow]}>
            <View style={[styles.tableCell, styles.tableSpecCell1]}>
              <Text>???????????????????????? ?? ????????????????</Text>
            </View>
            <View style={[styles.tableCell, styles.tableSpecCell2]}>
              <Text>25</Text>
            </View>
            <View style={[styles.tableCell, styles.tableSpecCell3]}>
              <Text>5000</Text>
            </View>
            <View style={[styles.tableCell, styles.tableSpecCell4]}>
              <Text>16</Text>
            </View>
            <View style={[styles.tableCell, styles.tableSpecCell5]}>
              <Text>??????</Text>
            </View>
          </View>
          <View style={[styles.tableRow, styles.descriptions]}>
            <Text style={[styles.tableTitle]}>??????????????:</Text>
            <Text></Text>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableCell, styles.tableSpecTitle, styles.tableCostCell1]}>
              <Text style={[styles.tableTitle]}>?????????????????? ??????????????????</Text>
            </View>
            <View style={[styles.tableCell, styles.tableCostCell2]}>
              <Text>28 000 ??</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
};

export default OrderPdf;

// <>
//   {/*<PDFViewer style={{width: "1000px", height: "600px"}}>*/}
//   {/*  <MyDocument />*/}
//   {/*</PDFViewer>*/}
//   <div style={{height: '300px', width: '700px'}}>
//
//     <canvas ref={lineChartRef}/>
//   </div>
//   <PDFDownloadLink
//     document={<OrderPdf />}
//     fileName={"Name"}
//   >?????????????? ????????</PDFDownloadLink>
// </>