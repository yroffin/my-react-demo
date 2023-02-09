import React from 'react';

import {
    Route,
} from "react-router-dom";

import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import Timer from './timer.jsx';
import PhaserComponent from './PhaserComponent.jsx';
import { useNavigate } from "react-router-dom";
import { Routes } from 'react-router-dom';

function MenuComponentHook() {
    const navigate = useNavigate();
    const items = [
        {
            label: 'File',
            icon: 'pi pi-fw pi-file',
            items: [
                {
                    label: 'New',
                    icon: 'pi pi-fw pi-plus',
                    items: [
                        {
                            label: 'Bookmark',
                            icon: 'pi pi-fw pi-bookmark',
                            command: () => {
                                navigate("/blogs");
                            }
                        },
                        {
                            label: 'Video',
                            icon: 'pi pi-fw pi-video',
                            command: () => {
                                navigate("/contact");
                            }
                        },

                    ]
                },
                {
                    label: 'Delete',
                    icon: 'pi pi-fw pi-trash',
                    command: () => {
                        navigate("/contact");
                    }
                },
                {
                    separator: true
                },
                {
                    label: 'Export',
                    icon: 'pi pi-fw pi-external-link'
                }
            ]
        },
        {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
                {
                    label: 'Left',
                    icon: 'pi pi-fw pi-align-left'
                },
                {
                    label: 'Right',
                    icon: 'pi pi-fw pi-align-right'
                },
                {
                    label: 'Center',
                    icon: 'pi pi-fw pi-align-center'
                },
                {
                    label: 'Justify',
                    icon: 'pi pi-fw pi-align-justify'
                },

            ]
        },
        {
            label: 'Users',
            icon: 'pi pi-fw pi-user',
            items: [
                {
                    label: 'New',
                    icon: 'pi pi-fw pi-user-plus',

                },
                {
                    label: 'Delete',
                    icon: 'pi pi-fw pi-user-minus',

                },
                {
                    label: 'Search',
                    icon: 'pi pi-fw pi-users',
                    items: [
                        {
                            label: 'Filter',
                            icon: 'pi pi-fw pi-filter',
                            items: [
                                {
                                    label: 'Print',
                                    icon: 'pi pi-fw pi-print'
                                }
                            ]
                        },
                        {
                            icon: 'pi pi-fw pi-bars',
                            label: 'List'
                        }
                    ]
                }
            ]
        },
        {
            label: 'Events',
            icon: 'pi pi-fw pi-calendar',
            items: [
                {
                    label: 'Edit',
                    icon: 'pi pi-fw pi-pencil',
                    items: [
                        {
                            label: 'Save',
                            icon: 'pi pi-fw pi-calendar-plus'
                        },
                        {
                            label: 'Delete',
                            icon: 'pi pi-fw pi-calendar-minus'
                        }
                    ]
                },
                {
                    label: 'Archieve',
                    icon: 'pi pi-fw pi-calendar-times',
                    items: [
                        {
                            label: 'Remove',
                            icon: 'pi pi-fw pi-calendar-minus'
                        }
                    ]
                }
            ]
        },
        {
            label: 'Quit',
            icon: 'pi pi-fw pi-power-off'
        }
    ];

    const start = <img alt="logo" src="https://primereact.org/images/logo.png" height="40" className="mr-2"></img>;
    const end = <InputText placeholder="Search" type="text" />;
    return (
        <div className="card">
            <Menubar model={items} start={start} end={end} />
            <Routes>
                <Route path="/blogs" element={<Timer label="12" />} />
                <Route path="/contact" element={<Timer label="13" />} />
                <Route path="*" element={<PhaserComponent />} />
            </Routes>
        </div>
    );
}

class MenuComponent extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            value: 'Hello, **world**!'
        };
        this.navigate = () => {
            console.log("navigate")
            this.props.route('/blogs')
        }
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    getRawMarkup() {
        return { __html: this.md.render(this.state.value) };
    }

    render() {
        return (
            <MenuComponentHook></MenuComponentHook>
        );
    }
}

export default MenuComponent
