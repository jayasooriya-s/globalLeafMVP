import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import formatNumber from '../helper/formatNumber'
const allBranchData: IProduct[] = [];

const Home: NextPage = () => {

  const [sales, setSales] = useState<IProduct[]>([]);
  const [total, setTotal] = useState<number>(0);
  useEffect(() => {
    fetchSalesData();
  }, []);



  async function fetchSalesData() {
    // Fetching branch data from api
    const branch_1: IProduct[] = await getBranchData('1');
    const branch_2: IProduct[] = await getBranchData('2');
    const branch_3: IProduct[] = await getBranchData('3');

    //Merging Branch Data
    for (var i in branch_1) {
      const fountItem = allBranchData.find(element => element.productID == branch_1[i].productID);
      if (fountItem != undefined) {
        const index = allBranchData.indexOf(fountItem);
        allBranchData[index].sales = allBranchData[index].sales + branch_1[i].sales;
      } else {
        allBranchData.push(branch_1[i]);
      }

    }

    for (var i in branch_2) {
      const fountItem = allBranchData.find(element => element.productID == branch_2[i].productID);
      if (fountItem != undefined) {
        const index = allBranchData.indexOf(fountItem);
        allBranchData[index].sales = allBranchData[index].sales + branch_2[i].sales;

      } else {
        allBranchData.push(branch_2[i]);
      }

    }

    for (var i in branch_3) {
      const fountItem = allBranchData.find(element => element.productID == branch_3[i].productID);
      if (fountItem != undefined) {
        const index = allBranchData.indexOf(fountItem);
        allBranchData[index].sales = allBranchData[index].sales + branch_3[i].sales;

      } else {
        allBranchData.push(branch_3[i]);
      }

    }
    // sort product 
    allBranchData.sort((a, b) => a.productName.localeCompare(b.productName));
    setSales(allBranchData);
    setTotal(findTotal(allBranchData));

  }


  // Search product

  function searchProduct(text: string) {
    var search = allBranchData.filter(element => element.productName.toLowerCase().includes(text.toLowerCase()));
    console.log(search);
    setSales(search);
    setTotal(findTotal(search));
  }

  function renderSales() {
    if (sales.length > 0) {
      return (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <tr className={styles.tr}>
              <th className={styles.th}>S No</th>
              <th className={styles.th}>Product</th>
              <th className={styles.th}>Sales</th>
            </tr>
            {
              sales.map((val, key) => {
                return (
                  <tr key={key} className={styles.tr}>
                    <td className={styles.td}>{key + 1}</td>
                    <td className={styles.td}>{val.productName}</td>
                    <td className={styles.td}>{formatNumber(val.sales)}</td>
                  </tr>
                )
              })
            }
          </table>
          <div className={styles.total}>Total : {formatNumber(total)}</div>
        </div>
      )
    } else {
      return <div></div>
    }
  }

  return (
    <div className={styles.container} >
      <input type="text"
        className={styles.input}
        placeholder="Search"
        title="Type in a Search Product"
        onChange={(text) => searchProduct(text.currentTarget.value)}>
      </input>
      {renderSales()}
    </div>
  )
}

export default Home


interface IProduct {
  productID: string;
  productName: string;
  sales: number;
}

interface IBranchData {
  branchId: string,
  product: IProduct,
}


function findTotal(productList: IProduct[]) {
  var saleTotal: number = 0;
  for (var i in productList) {
    saleTotal = saleTotal + productList[i].sales;
  }
  return saleTotal
}

export async function getBranchData(id: string) {
  try {
    const response = await fetch(`/api/sales/${id}`);
    var branch_1_data = await response.json();
    const data: IProduct[] = [];
    for (var i in branch_1_data.data.products) {
      data.push({ productID: branch_1_data.data.products[i]['_id'], productName: branch_1_data.data.products[i]['productName'], sales: branch_1_data.data.products[i]['sale'] },);
    }
    return data;
  } catch (e) {

  } finally {
    return []
  }
}
