import * as React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import { Pressable } from 'react-native';
import { isMobile } from "react-device-detect";

const ProductCard = (props) => {
    const [isChecked, setIsChecked] = React.useState(false);

    return (
        <Box sx={{ maxWidth: isMobile ? '100%' : 275 ,minWidth:isMobile ? '100%' : 220 }}>
            <Pressable onPress={() => {
                setIsChecked(!isChecked);
                if (props.callback)
                    props.callback(props.productId);
            }}>
                <Card variant="outlined">
                    <React.Fragment>
                        <Checkbox checked={isChecked} color="default" />
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Typography sx={{ fontSize: 14, alignItems: 'center' }} color="text.secondary" gutterBottom>
                                {props.sku}
                            </Typography>
                            <Typography variant="h5" component="div">
                                {props.title}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                {props.price}
                            </Typography>
                            <Typography variant="body2">
                                {props.specific}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            {/*<Button size="small">Learn More</Button>*/}
                        </CardActions>
                    </React.Fragment>
                </Card>
            </Pressable>
        </Box>
    );
}


export default ProductCard;