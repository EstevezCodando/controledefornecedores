import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Tooltip,
  IconButton,
  Collapse,
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useStyles from "./UserManagementForm.styles";

const UserManagementForm = ({ users, onToggleBlockStatus }) => {
  const [expanded, setExpanded] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const classes = useStyles();

  const handleExpandClick = (userId) => {
    setExpanded((prev) => ({ ...prev, [userId]: !prev[userId] }));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchTerm)
  );

  return (
    <div>
      <TextField
        label="Buscar Usuário"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <Grid container spacing={3}>
        {filteredUsers.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <Card className={classes.expandableCard}>
              <CardContent className={classes.fixedCardContent}>
                <div>
                  <Tooltip title={user.email}>
                    <Typography
                      className={classes.emailTypography}
                      variant="h6"
                    >
                      {user.email}
                    </Typography>
                  </Tooltip>
                  <Typography color="textSecondary">
                    Tipo de Usuário: {user.userType}
                  </Typography>
                  <Typography color="textSecondary">
                    Status: {user.isBlocked ? "Bloqueado" : "Ativo"}
                  </Typography>
                </div>
                <div>
                  <Button
                    variant="contained"
                    color={user.isBlocked ? "secondary" : "primary"}
                    onClick={() => onToggleBlockStatus(user.id, user.isBlocked)}
                  >
                    {user.isBlocked ? "Desbloquear" : "Bloquear"}
                  </Button>
                  <IconButton
                    onClick={() => handleExpandClick(user.id)}
                    aria-expanded={expanded[user.id] || false}
                    aria-label="mostrar mais"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </div>
              </CardContent>
              <Collapse in={expanded[user.id]} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>
                    <strong>Data de Criação:</strong> {user.createdAt}
                  </Typography>
                  <Typography paragraph>
                    <strong>Outras informações:</strong>{" "}
                    {/* TO DO Adicionar Nome, setor, idade, requisições */}
                  </Typography>
                </CardContent>
              </Collapse>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

UserManagementForm.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      userType: PropTypes.string.isRequired,
      isBlocked: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onToggleBlockStatus: PropTypes.func.isRequired,
};

export default UserManagementForm;
