import React, { useState } from 'react';
import { getCache, setCache } from "../../services/CacheService";
import RestClient from "../../services/RestClient";
import SelectFilter from './SelectFilter';
import { setLangId, setDistId, setMandalId, setStateId, setVillageId } from '../../redux/slice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
function LocationFilters() {
    const dispatch = useDispatch();
    const langId = useSelector((state) => state.store.langId)
    const stateId = useSelector((state) => state.store.stateId)
    const distId = useSelector((state) => state.store.distId)
    const mandalId = useSelector((state) => state.store.mandalId)
    const villageId = useSelector((state) => state.store.villageId)

    const [stateOptions, setStateOptions] = useState([]);
    const [distOptions, setDistOptions] = useState([]);
    const [mandalOptions, setMandalOptions] = useState([]);
    const [villageOptions, setVillageOptions] = useState([]);
    const [showDetails, setShowDetails] = useState(false);
    const [selectedStat, setSelectedStat] = useState("");
    const [showNewsPapers, setShowNewsPapers] = useState(true);
    const handleStatClick = (stat) => {
        if (selectedStat === stat) {
            setShowDetails(false);
            setSelectedStat("");
        } else {
            if (distOptions.length < 1) {
                alert('select upto state level and fetch')
                return;
            }
            setSelectedStat(stat);
            setShowDetails(true);
            fetchStats("village")
            setShowNewsPapers(true);
            if (!stat.includes('installs')) {
                setShowNewsPapers(false);
            }
        }
    };
    const handleLangChange = (e) => {
        dispatch(setLangId(e.target.value));
        dispatch(setStateId(""));
        dispatch(setDistId(""));
        dispatch(setMandalId(""));
        dispatch(setVillageId(""));
        if (e.target.value === '') {
            setStateOptions([]);
            return;
        }
        fetchStateOptions(e.target.value);
    };

    const handleStateChange = (e) => {
        dispatch(setStateId(e.target.value));
        dispatch(setDistId(""));
        dispatch(setMandalId(""));
        dispatch(setVillageId(""));
        if (e.target.value === '') return;
        fetchDistOptions(e.target.value);
    };

    const handleDistChange = (e) => {
        dispatch(setDistId(e.target.value));
        dispatch(setMandalId(""));
        dispatch(setVillageId(""));
        if (e.target.value === '') return;
        fetchMandalOptions(e.target.value);
    };

    const handleMandalChange = (e) => {
        dispatch(setMandalId(e.target.value));
        dispatch(setVillageId(""));
        if (e.target.value === '') return;
        fetchVillageOptions(e.target.value);
    };
    const fetchStateOptions = async (langId) => {
        const cacheKey = `states-${langId}`;
        const cachedData = getCache(cacheKey);
        if (cachedData) {
            setStateOptions(cachedData);
            return;
        }
        try {
            const res = await RestClient.get(`/stats/getStates?langId=${langId}`);
            setStateOptions(res?.data || []);
            setCache(cacheKey, res?.data || []);
        } catch (error) {
            console.error("Error fetching states:", error);
            setStateOptions([]);
        }
    };

    const fetchDistOptions = async (stateId) => {
        const cacheKey = `districts-${stateId}`;
        const cachedData = getCache(cacheKey);
        if (cachedData) {
            setDistOptions(cachedData);
            return;
        }
        try {
            const res = await RestClient.get(`/stats/getDistricts?stateId=${stateId}`);
            setDistOptions(res?.data || []);
            setCache(cacheKey, res?.data || []);
        } catch (error) {
            console.error("Error fetching districts:", error);
            setDistOptions([]);
        }
    };

    const fetchMandalOptions = async (distId) => {
        const cacheKey = `mandals-${distId}`;
        const cachedData = getCache(cacheKey);
        if (cachedData) {
            setMandalOptions(cachedData);
            return;
        }
        try {
            const res = await RestClient.get(`/stats/getMandals?districtId=${distId}`);
            setMandalOptions(res?.data || []);
            setCache(cacheKey, res?.data || []);
        } catch (error) {
            console.error("Error fetching mandals:", error);
            setMandalOptions([]);
        }
    };

    const fetchVillageOptions = async (mandalId) => {
        const cacheKey = `villages-${mandalId}`;
        const cachedData = getCache(cacheKey);
        if (cachedData) {
            setVillageOptions(cachedData);
            return;
        }
        try {
            const res = await RestClient.get(`/stats/getVillages?mandalId=${mandalId}`);
            setVillageOptions(res?.data || []);
            setCache(cacheKey, res?.data || []);
        } catch (error) {
            console.error("Error fetching villages:", error);
            setVillageOptions([]);
        }
    };

    return (
        <>
            <SelectFilter
                initialOption='Select Language'
                options={[{ value: '1', label: 'Telugu' }, { value: '2', label: 'Tamil' }, { value: '10', label: 'Odiya' }]}
                onChange={handleLangChange}
                value={langId}
            />
            {langId &&
                <SelectFilter
                    initialOption='Select State'
                    options={stateOptions}
                    onChange={handleStateChange}
                    value={stateId}
                />
            }
            {stateId &&
                <SelectFilter
                    initialOption='Select District'
                    options={distOptions}
                    onChange={handleDistChange}
                    value={distId}
                />
            }

            {distId &&
                <SelectFilter
                    initialOption='Select Mandal'
                    options={mandalOptions}
                    onChange={handleMandalChange}
                    value={mandalId}
                />
            }
            {mandalId && <SelectFilter
                initialOption='Select Village'
                options={villageOptions}
                onChange={(e) => dispatch(setVillageId(e.target.value))}
                value={villageId}
            />}
            {/* {stateId &&
                <button onClick={fetchStats}>Fetch Stats</button>
            } */}
        </>
    )
}

export default LocationFilters