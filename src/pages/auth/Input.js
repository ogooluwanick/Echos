import React from 'react'
import { TextField ,IconButton,Grid,InputAdornment} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';


const Input = ({className,name,half,label,handleChange,autoFocus,type,handleShowPassword}) => {
    
  return (
    <div>
        <Grid item xs={12} sm={half?6:12} md={10}>
            <TextField
                className={className}
                name={name} 
                label={label} 
                onChange={handleChange} 
                variant="outlined" 
                required
                fullWidth
                autoFocus={autoFocus}
                type={type}
                InputProps={name === "password" ||  name === "confirmPassword"?{
                    endAdornment:(
                        <InputAdornment position='end'>
                            <IconButton onClick={handleShowPassword}>
                                {type === "password" ? <Visibility/> : <VisibilityOff/>}
                            </IconButton>
                        </InputAdornment>
                    )
                }:null}
                />
        </Grid>
    </div>
  )
}

export default Input