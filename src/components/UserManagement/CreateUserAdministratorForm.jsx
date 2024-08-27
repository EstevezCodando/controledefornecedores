import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import useStyles from "./CreateUserAdministratorForm.styles";

const CreateUserAdministratorForm = ({ onCreateUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("collaborator");
  const [message, setMessage] = useState("");
  const classes = useStyles();

  const handleCreateUser = async (e) => {
    e.preventDefault();
    const { message, user } = await onCreateUser(email, password, userType);
    if (user) {
      setMessage("Usuário criado com sucesso!");
      setEmail("");
      setPassword("");
      setUserType("collaborator");
    } else {
      setMessage(message);
    }
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Criar Novo Usuário
        </Typography>
        <form onSubmit={handleCreateUser}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Senha"
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Tipo de Usuário"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                SelectProps={{
                  native: true,
                }}
              >
                <option value="collaborator">Colaborador</option>
                <option value="admin">Administrador</option>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
              >
                Criar Usuário
              </Button>
            </Grid>
          </Grid>
        </form>
        {message && (
          <Typography variant="body2" color="error" mt={2}>
            {message}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default CreateUserAdministratorForm;
