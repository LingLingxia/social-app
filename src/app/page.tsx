import Image from "next/image";
import styles from "./page.module.css";
import { Box, Button, Container,  Typography } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    // <div className={styles.page}>

    // </div>
    <Container maxWidth="sm">
        <Box sx={{mt:8,textAlign:'center'}}>
            <Typography variant="h3" component="h1" gutterBottom>
              Welcome to Social App
            </Typography>
            <Link href="/auth/login" passHref >
                <Button variant="contained" color="primary" sx = {{m:1}}
                >
                  Login
                </Button>
            </Link>
            <Link href="/auth/register" passHref >
                <Button variant="contained" color="secondary" sx = {{m:1}}
                >
                  Register
                </Button>
            </Link>
        </Box>
    </Container>
  );
}
