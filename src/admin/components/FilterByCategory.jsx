import { Grid, TextField } from '@mui/material'
import React from 'react'
import { CustomAutocomplete, CustomListBox } from '../../refactor/CustomStyle';



const FilterByCategory = ({
    dataSearch, handleChangeByCategory, clearOption, selectedTier, initialTier, initialRole, initialRegion,
    series, selectedRegion, selectedRole
}) => {
    
    const formFilter = (name) => {
        switch (name) {
            case 'skin':
                return (
                    <>
                        <Grid item xs={12} sm={3}>
                            <CustomAutocomplete
                                disablePortal
                                options={series}
                                value={dataSearch.skin?.series}
                                renderInput={(params) => <TextField {...params} label="Skin Series" />}
                                onChange={(event, value) => handleChangeByCategory(value, 'series', dataSearch.category)}
                                className="w-80"
                            />
                        </Grid>

                        <Grid item xs={12} sm={3}>
                            <CustomListBox
                                value={selectedTier}
                                initial={initialTier}
                                onChange={(value) => handleChangeByCategory(value, 'tier', dataSearch.category)}
                                type={dataSearch.skin.tier}
                                title={'Skin Tier'}
                                clearOption={(event) => clearOption(event, 'tier', dataSearch.category)}
                            />
                        </Grid>
                    </>
                )

            case 'champion':
                return (
                    <>
                        <Grid item xs={12} sm={3}>
                            <CustomListBox
                                value={selectedRegion}
                                initial={initialRegion}
                                onChange={(value) => handleChangeByCategory(value, 'region', dataSearch.category)}
                                type={dataSearch.champion.region}
                                title={'Champion Region'}
                                clearOption={(event) => clearOption(event, 'region', dataSearch.category)}
                            />
                        </Grid>

                        <Grid item xs={12} sm={3} >
                            <CustomListBox
                                value={selectedRole}
                                initial={initialRole}
                                onChange={(value) => handleChangeByCategory(value, 'role', dataSearch.category)}
                                type={dataSearch.champion.role}
                                title={'Champion role'}
                                clearOption={(event) => clearOption(event, 'role', dataSearch.category)}
                            />
                        </Grid>
                    </>
                )

            case 'chibi':
                return (
                    <>
                        <Grid item xs={12} sm={3}>
                            <CustomListBox
                                value={selectedTier}
                                initial={initialTier}
                                onChange={(value) => handleChangeByCategory(value, 'tier', dataSearch.category)}
                                type={dataSearch.chibi.tier}
                                title={'Chibi Tier'}
                                clearOption={(event) => clearOption(event, 'tier', dataSearch.category)}
                            />
                        </Grid>

                        <Grid item xs={12} sm={3}>
                            <CustomAutocomplete
                                disablePortal
                                options={series}
                                value={dataSearch.chibi.champion}
                                renderInput={(params) => <TextField {...params} label="Chibi Champion" />}
                                onChange={(event, value) => handleChangeByCategory(value, 'champion', dataSearch.category)}
                                className="w-80"
                            />
                        </Grid>
                    </>
                )

            default:
                break
        }
    }

    return (
        <Grid container marginTop={0} spacing={4} >
            {formFilter(dataSearch.category)}
        </Grid>
    )

}

export default FilterByCategory