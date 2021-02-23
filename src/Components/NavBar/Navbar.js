import React,{useState} from 'react'
import  './Navbar.css'
import NotificationsIcon from '@material-ui/icons/Notifications';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {stockNSymbols} from '../data_StockNSymbols'

function Navbar() {

    return (
        <div className='navbar'>
            <div className='navbar_name'>
                <h1>MyFin</h1>
                <p>Get your daily finance</p>
            </div>
            <div className='navbar_search'>
                <Autocomplete
                    id="custom-input-demo" 
                    onChange={(event, value) => console.log(value.split('|')[1])} 
                    options={stockNSymbols.map((option) => option.name +' | '+option.value)}
                    renderInput={(params) => (
                        <div ref={params.InputProps.ref}>
                        <input 
                        style={{ width: 350,marginTop:20,height:28,borderRadius:10,outline:'none',border:'1px solid gray',padding:5,paddingLeft:20}}
                        type="text" {...params.inputProps} 
                        placeholder='Search for stocks and companies...'
                        />
                        </div>
                    )}
                    />
            </div>
            
            <div className="navbar_Icons">
                <NotificationsIcon fontSize='Large'/>
            </div>
        </div>
    )
}

export default Navbar
