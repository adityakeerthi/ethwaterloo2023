import React, { useState, useEffect } from "react";
import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	FormControlLabel,
	Checkbox,
} from "@material-ui/core";
import { Autocomplete } from "@mui/material";
import { fade, makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#3b5998",
		},
		secondary: {
			main: "#ffffff",
		},
	},
});

const useStyles = makeStyles((theme) => ({
	appBar: {
		backgroundColor: theme.palette.primary.main,
	},
	title: {
		flexGrow: 1,
		marginLeft: theme.spacing(2),
	},
	inputRoot: {
		color: "inherit",
	},
	search: {
		display: "flex",
		alignItems: "center",
    marginRight: "600px",
		[theme.breakpoints.up("sm")]: {
			width: "auto",
		},
		"& .MuiInputLabel-root": {
			color: "#ffffff",
		},
		"& .MuiOutlinedInput-root": {
			"& fieldset": {
				borderColor: "#ffffff",
			},
			"&:hover fieldset": {
				borderColor: "#ffffff",
			},
		},
		"& .MuiAutocomplete-inputRoot": {
			color: "#ffffff",
		},
	},
}));

function Navbar({handleProtocolChange, selectedProtocol, setSelectedProtocol, contracts, deployments, setContracts, setDeployments, user, setUser, refreshDeployments}) {
	const classes = useStyles();
	const [openLogin, setOpenLogin] = useState(false);
	const [openSignup, setOpenSignup] = useState(false);
  const [protocols, setProtocols] = useState([]);
	const [signupData, setSignupData] = useState({
		email: "",
		password: "",
		name: "",
		auditRequest: false,
		companyEmail: "",
		companyName: "",
		phoneNumber: "",
	});

  
  useEffect(() => {
    const protocols = contracts.map(contract => contract.protocol);
    const uniqueProtocols = [...new Set(protocols)];
    setProtocols(uniqueProtocols);
  }, [contracts]);

	useEffect(() => {
    axios.defaults.withCredentials = true
		axios
			.post("http://localhost:3005/login/cookie", { withCredentials: true })
			.then((response) => {
        console.log(response);
				setUser(response.data);
			})
			.catch((error) => {
				// handle error here
			});
	}, []);

	const handleLogin = () => {

    axios
      .post("http://localhost:3005/login", signupData, { withCredentials: true })
      .then((response) => {
        setOpenLogin(false);
        setUser(response.data);
      })
      .catch((error) => {
        // handle error here
      });
	};

	const handleAuditorCheckboxChange = (e) => {
		const { name, checked } = e.target;
		setSignupData((prevData) => ({
			...prevData,
			auditRequest: checked,
		}));
	};

	const handleSignup = () => {
		axios
			.post("http://localhost:3005/signup", signupData, { withCredentials: true })
			.then((response) => {
				setOpenSignup(false);
				setUser(response.data);
			})
			.catch((error) => {
				// handle error here
			});
	};

	const handleSignupChange = (e) => {
		setSignupData({ ...signupData, [e.target.name]: e.target.value });
	};

	

	return (
		<ThemeProvider theme={theme}>
			<AppBar position="static" className={classes.appBar}>
				<Toolbar>
					<Typography variant="h6" className={classes.title}>
						<img src="logo.png" alt="logo" height="60px" style={{textAlign: "center"}}/>
					</Typography>
					<div className={classes.search}>
						<Autocomplete
							disablePortal
							id="combo-box-demo"
							options={protocols}
							sx={{ width: 300 }}
							value={selectedProtocol}
							onChange={handleProtocolChange}
							renderInput={(params) => (
								<TextField
									{...params}
									label="Select Protocol"
									variant="outlined"
									InputProps={{
										...params.InputProps,
										className: classes.inputRoot,
									}}
								/>
							)}
						/>
					</div>
					{user ? (
						<Typography variant="subtitle1">Welcome, {user.name}</Typography>
					) : (
						<>
							<Button color="inherit" onClick={() => setOpenLogin(true)}>
								Login
							</Button>
							<Button color="inherit" onClick={() => setOpenSignup(true)}>
								Signup
							</Button>
						</>
					)}
				</Toolbar>

				<Dialog open={openLogin} onClose={() => setOpenLogin(false)}>
					<DialogTitle>Login</DialogTitle>
					<DialogContent>
						<TextField
							autoFocus
							margin="dense"
							name="email"
							label="Email Address"
							type="email"
							fullWidth
							value={signupData.email}
							onChange={handleSignupChange}
						/>
						<TextField
							margin="dense"
							name="password"
							label="Password"
							type="password"
							fullWidth
							value={signupData.password}
							onChange={handleSignupChange}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleLogin} color="primary">
							Login
						</Button>
					</DialogActions>
				</Dialog>

				<Dialog open={openSignup} onClose={() => setOpenSignup(false)}>
					<DialogTitle>Signup</DialogTitle>
					<DialogContent>
						<TextField
							autoFocus
							margin="dense"
							name="email"
							label="Email Address"
							type="email"
							fullWidth
							value={signupData.email}
							onChange={handleSignupChange}
						/>
						<TextField
							margin="dense"
							name="password"
							label="Password"
							type="password"
							fullWidth
							value={signupData.password}
							onChange={handleSignupChange}
						/>
						<TextField
							margin="dense"
							name="name"
							label="Name"
							fullWidth
							value={signupData.name}
							onChange={handleSignupChange}
						/>
						<TextField
							margin="dense"
							name="companyEmail"
							label="Company Email"
							type="email"
							fullWidth
							value={signupData.companyEmail}
							onChange={handleSignupChange}
						/>
						<TextField
							margin="dense"
							name="companyName"
							label="Company Name"
							fullWidth
							value={signupData.companyName}
							onChange={handleSignupChange}
						/>
						<TextField
							margin="dense"
							name="phoneNumber"
							label="Phone Number"
							fullWidth
							value={signupData.phoneNumber}
							onChange={handleSignupChange}
						/>
						<FormControlLabel
							control={
								<Checkbox
									checked={signupData.isAuditor}
									onChange={handleAuditorCheckboxChange}
									name="isAuditor"
									style={{ color: "black" }}
								/>
							}
							label="Are you requesting to be an auditor?"
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleSignup} color="primary">
							Signup
						</Button>
					</DialogActions>
				</Dialog>
			</AppBar>
		</ThemeProvider>
	);
}

export default Navbar;
