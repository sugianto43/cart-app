import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Card,
  Box,
  makeStyles,
  Select,
  Divider,
  MenuItem,
  Button,
  TextField
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';


const useStyles = makeStyles((theme) => ({
  container: {
    padding: 20,
    minHeight: '100vh'
  },
  card: {
    padding: 20
  },
  content: {
    display: 'flex',
    width: '100%',
  },
  contentLeft: {
    width: "30%",
    '& .text': {
      fontWeight: 'bold',
    }
  },
  contentRight: {
    width: "70%",

    '& p': {
      marginBottom: 5,
    },

    '& span': {
      color: 'red',
    },

    '& .selected': {
      width: '100%',
      maxWidth: 600
    }
  }

}));

function App() {
  const classes = useStyles();
  const [names, setNames] = useState([]);
  const [name, setName] = useState('');
  const [dc, setDc] = useState('');
  const [hasData, setHasData] = useState(false)
  const [payment, setPayment] = useState('')
  const [product, setProduct] = useState('')
  const [unitList, setUnitList] = useState([])
  const [unit, setUnit] = useState('')
  const [price, setPrice] = useState(0)
  const [quantity, setQuantity] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const fetchData = () => {
    axios.get('http://dummy.restapiexample.com/api/v1/employees').then(res => {
      let data = res.data.data.map(item => item.employee_name)
      setNames(data);
    }).catch(err => {
      console.log(err);
    })
  }

  const products = [
    {
      product_name: 'Morning Dew Milk',
      units: [
        {
          name: 'Karton',
          price: 200000
        },
        {
          name: 'pak',
          price: 100000
        },
        {
          name: 'pcs',
          price: 10000
        }
      ]
    },
    {
      product_name: 'Le Minerale 600ML',
      units: [
        {
          name: 'pak',
          price: 50000
        },
        {
          name: 'pcs',
          price: 8000
        }
      ]
    },
    {
      product_name: 'Greenfields Full Cream Milk 1 L',
      units: [
        {
          name: 'pak',
          price: 250000
        },
        {
          name: 'pcs',
          price: 25000
        }
      ]
    },
  ]

  useEffect(() => {
    fetchData();
  }, [])

  const handleChange = (event) => {
    setName(event.target.value);
    setHasData(!hasData)
  };

  const handleChangeDc = (event) => {
    setDc(event.target.value);
  };

  const handleChangePayment = (event) => {
    setPayment(event.target.value);
  };

  const handleChangeProduct = (event) => {
    let units = products.find(item => item.product_name === event.target.value).units
    setProduct(event.target.value);
    setUnitList(units)
  }

  const handleChangeUnit = (event) => {
    let price = unitList.find(item => item.name === event.target.value).price
    setUnit(event.target.value);
    setPrice(price)
  }

  const handleChangeQuantity = (event) => {
    setQuantity(event.target.value);
    setTotalPrice(price * Number(event.target.value))
  }

  return (
    <div style={{ background: '#EAEAEA' }}>
      <Container className={classes.container}>
        <h2>Create Order</h2>
        <Card className={classes.card}>
          <Box className={classes.content}>
            <Box className={classes.contentLeft}>
              <p className='text'>Detail</p>
            </Box>
            <Box className={classes.contentRight}>
              <Box>
                <p>Name <span>*</span></p>
                <Select
                  variant='outlined'
                  className='selected'
                  placeholder='Name'
                  value={name}
                  onChange={handleChange}
                >
                  {names.map((item, idx) => (
                    <MenuItem key={idx} value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </Box>

              {hasData && <Box>
                <p>Distribution Center <span>*</span></p>
                <Select
                  variant='outlined'
                  style={{
                    width: 400
                  }}
                  placeholder='Distribution Center'
                  value={dc}
                  onChange={handleChangeDc}
                >
                  <MenuItem value='DC Cikarang'>DC Cikarang</MenuItem>
                  <MenuItem value='DC Tangerang'>DC Tangerang</MenuItem>

                </Select>
              </Box>}
              {!hasData && <Box>
                <p>Distribution Center <span>*</span></p>
                <Select
                  variant='outlined'
                  style={{
                    width: 400
                  }}
                  placeholder='Distribution Center'
                  value={dc}
                >
                  <MenuItem>No data available</MenuItem>

                </Select>
              </Box>}
              {name && dc &&
                (<>
                  <Box style={{ display: 'flex' }}>
                    <Box>
                      <p>Payment Type <span>*</span></p>
                      <Select
                        variant='outlined'
                        style={{
                          width: 400,
                          marginRight: 10
                        }}
                        placeholder='Payment Type '
                        value={payment}
                        onChange={handleChangePayment}
                      >
                        {['Cash H+1', 'Cash H+3', 'Cash H+7', 'Transfer H+1', 'Transfer H+3', 'Transfer H+7',].map((item, idx) => (<MenuItem key={idx} value={item}>{item}</MenuItem>))}

                      </Select>
                    </Box>
                    <Box>
                      <p>Expired Date <span>*</span></p>
                      <TextField
                        variant='outlined'
                        type={'date'}
                        style={{
                          width: 400,
                        }}
                      />
                    </Box>
                  </Box>
                  <Box style={{ marginTop: 20 }}>
                    <p>Notes</p>
                    <TextField
                      multiline
                      rows={6}
                      variant='outlined'
                      style={{
                        width: '100%',
                        maxWidth: 600
                      }}
                    />
                  </Box>
                </>)
              }
            </Box>
          </Box>

          {name && dc && <Box>
            <Divider style={{ marginTop: 20 }} />
            <Box className={classes.content}>
              <Box className={classes.contentLeft}>
                <p className='text'>Product</p>
              </Box>
              <Box className={classes.contentRight}>
                <Box style={{ display: 'flex' }}>
                  <Box>
                    <p>Product <span>*</span></p>
                    <Select
                      variant='outlined'
                      style={{
                        width: 600,
                        marginRight: 10
                      }}
                      placeholder='Distribution Center'
                      value={product}
                      onChange={handleChangeProduct}
                    >
                      {products.map((item, idx) => (<MenuItem value={item.product_name}>{item.product_name}</MenuItem>))}

                    </Select>
                  </Box>

                  {product ? (<Box>
                    <p>Unit <span>*</span></p>
                    <Select
                      variant='outlined'
                      style={{
                        width: 200,
                        marginRight: 10
                      }}
                      placeholder='Distribution Center'
                      value={unit}
                      onChange={handleChangeUnit}
                    >
                      {unitList.map((item) => (<MenuItem value={item.name}>{item.name}</MenuItem>))}

                    </Select>
                  </Box>) : (
                    <Box>
                      <p>Unit <span>*</span></p>
                      <Select
                        variant='outlined'
                        style={{
                          width: 200,
                          marginRight: 10
                        }}
                        placeholder='Distribution Center'

                      >
                        <MenuItem >No data available</MenuItem>

                      </Select>
                    </Box>
                  )}
                </Box>

                <Box>
                  <Box style={{ display: 'flex', width: '100%', maxWidth: 810 }}>
                    <Box style={{}}>
                      <p>Quantity <span>*</span></p>
                      <TextField
                        variant='outlined'
                        fullWidth
                        type={'number'}
                        value={quantity}
                        onChange={handleChangeQuantity}
                        style={{
                          width: 200,
                          marginRight: 10
                        }}
                      />
                    </Box>
                    <Box style={{}}>
                      <p>Price <span>*</span></p>
                      <TextField
                        variant='outlined'
                        fullWidth
                        value={price}
                        disabled
                        style={{
                          width: 200,
                          marginRight: 10
                        }}
                      />
                    </Box>
                    <Box style={{ width: '100%' }}>
                      <p>Total Price <span>*</span></p>
                      <TextField
                        variant='outlined'
                        fullWidth
                        disabled
                        value={totalPrice}
                        style={{ background: '#EAEAEA' }}
                      />
                    </Box>
                  </Box>
                  <Box style={{ width: '100%', maxWidth: 810 }}>
                    <Box style={{ width: 390, marginLeft: 'auto' }}>
                      <Divider style={{ marginTop: 20, }} />
                      <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h5 style={{ margin: '10px 0' }}>Total Nett Price</h5>
                        <h5 style={{ margin: '10px 0' }}>0</h5>
                      </Box>
                    </Box>
                  </Box>
                </Box>


                <Box>
                  <Button variant='outlined' color='primary' endIcon={<AddIcon />}>new item</Button>
                </Box>
              </Box>
            </Box>

          </Box>}
          <Divider style={{ marginTop: 20 }} />
          <Box style={{ marginLeft: 'auto', width: 'fit-content', marginTop: 20 }}>
            <Button variant='text' style={{ marginRight: 15 }}>cancel</Button>
            <Button disabled={true} variant='contained' color='primary'>confirm</Button>
          </Box>
        </Card>
      </Container>
    </div>
  );
}

export default App;
