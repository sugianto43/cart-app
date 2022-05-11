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
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';


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
  const [date, setDate] = useState(null)
  const [hasData, setHasData] = useState(false)
  const [payment, setPayment] = useState('')
  const [total, setTotal] = useState('')
  const [disabledBtn, setDisabledBtn] = useState(true)
  const [productsFields, setProductsFields] = useState([
    {
      product: '',
      units: '',
      unitList: [],
      quantity: '',
      price: '',
      totalPrice: 0
    },
  ])
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

  const handleChangeProduct = (idx, event) => {
    let values = [...productsFields]
    if (event.target.name === 'product') {
      let units = products.find(item => item.product_name === event.target.value).units
      values[idx].unitList = units
      setProductsFields(values)
    }

    if (event.target.name === 'units') {
      let price = values[idx].unitList.find(item => item.name === event.target.value).price
      values[idx].price = price
      setProductsFields(values)
    }

    if (event.target.name === 'quantity') {
      values[idx].totalPrice = event.target.value * values[idx].price
      setProductsFields(values)
    }

    values[idx][event.target.name] = event.target.value
    setProductsFields(values)
  }


  const handleAddFields = () => {
    setProductsFields([...productsFields, {
      product: '',
      units: '',
      quantity: '',
      price: '',
      totalPrice: ''
    }])
  }

  const removeFields = (idx) => {
    const values = [...productsFields];
    values.splice(idx, 1);
    setProductsFields(values)
  }

  useEffect(() => {
    productsFields.map(item => {
      if (item.product && item.units && item.quantity && item.price) {
        setDisabledBtn(false)
      } else {
        setDisabledBtn(true)
      }
    })
    setTotal(productsFields.reduce((x, y) => x + y.totalPrice, 0))
  }, [productsFields])


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
                <p style={{ fontSize: 12, margin: "5px 0 0 0" }}>if the data did not show, refresh the page</p>
              </Box>

              {hasData && <Box>
                <p >Distribution Center <span>*</span></p>
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
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
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

              {/* ======      DYNAMIC FIELDS       ===== */}
              <Box className={classes.contentRight}>
                {productsFields.map((item, idx) => (
                  <Box key={idx}>
                    <Box style={{ display: 'flex' }}>
                      <Box style={{ position: 'relative' }}>
                        {idx !== 0 && <Box style={{ position: 'absolute', left: '-25px', top: '55px', cursor: 'pointer', color: '#EE4B2B' }} onClick={() => removeFields(idx)}><RemoveCircleIcon color="inherit" /></Box>}
                        <p>Product <span>*</span></p>
                        <Select
                          name='product'
                          variant='outlined'
                          style={{
                            width: 600,
                            marginRight: 10
                          }}
                          placeholder='Distribution Center'
                          value={item.product}
                          onChange={(event) => handleChangeProduct(idx, event)}
                        >
                          {products.map((item, idx) => (<MenuItem value={item.product_name}>{item.product_name}</MenuItem>))}

                        </Select>
                      </Box>

                      {item.product ? (<Box>
                        <p>Unit <span>*</span></p>
                        <Select
                          name='units'
                          variant='outlined'
                          style={{
                            width: 200,
                            marginRight: 10
                          }}
                          placeholder='Distribution Center'
                          value={item.units}
                          onChange={(event) => handleChangeProduct(idx, event)}
                        >
                          {item.unitList.map((item) => (<MenuItem value={item.name}>{item.name}</MenuItem>))}

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
                            name='quantity'
                            variant='outlined'
                            fullWidth
                            type={'number'}
                            value={item.quantity}
                            onChange={(event) => handleChangeProduct(idx, event)}
                            style={{
                              width: 200,
                              marginRight: 10
                            }}
                          />
                        </Box>
                        <Box style={{}}>
                          <p>Price <span>*</span></p>
                          <TextField
                            name='price'
                            variant='outlined'
                            fullWidth
                            value={item.price}
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
                            name='totalPrice'
                            variant='outlined'
                            fullWidth
                            disabled
                            value={item.totalPrice}
                            style={{ background: '#EAEAEA' }}
                          />
                        </Box>
                      </Box>
                      <Box style={{ width: '100%', maxWidth: 810 }}>
                        <Box style={{ width: 390, marginLeft: 'auto' }}>
                          <Divider style={{ marginTop: 20, }} />
                          <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h5 style={{ margin: '10px 0' }}>Total Nett Price</h5>
                            <h5 style={{ margin: '10px 0' }}>{item.totalPrice}</h5>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>))}


                <Box>

                  <Button variant='outlined' color='primary' endIcon={<AddIcon />} onClick={handleAddFields}>new item</Button>
                </Box>

                <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: 385, margin: '10px 35px -10px auto' }}>
                  <h5>Total</h5>
                  <h5>{total}</h5>
                </Box>
              </Box>
            </Box>

          </Box>}
          <Divider style={{ marginTop: 20 }} />
          <Box style={{ marginLeft: 'auto', width: 'fit-content', marginTop: 20 }}>
            <Button variant='text' style={{ marginRight: 15 }}>cancel</Button>
            <Button disabled={!name || !dc || !payment || !date || disabledBtn} variant='contained' color='primary'>confirm</Button>
          </Box>
        </Card>
      </Container>
    </div>
  );
}

export default App;
