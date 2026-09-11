package com.conygre.spring.boot.services;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import com.conygre.spring.boot.entities.CompactDisc;
import com.conygre.spring.boot.repos.CompactDiscRepository;

/**
 * Unit tests for the CompactDiscServiceImpl class.
 * Uses Mockito to mock the CompactDiscRepository dependency.
 */
@RunWith(MockitoJUnitRunner.class)
public class CompactDiscServiceImplTest {

    @Mock
    private CompactDiscRepository dao;

    @InjectMocks
    private CompactDiscServiceImpl service;

    private CompactDisc testDisc1;
    private CompactDisc testDisc2;
    private List<CompactDisc> testCatalog;

    @Before
    public void setUp() {
        testDisc1 = new CompactDisc("Abbey Road", 9.99, "The Beatles", 17);
        testDisc1.setId(1);

        testDisc2 = new CompactDisc("The Wall", 12.99, "Pink Floyd", 26);
        testDisc2.setId(2);

        testCatalog = new ArrayList<>();
        testCatalog.add(testDisc1);
        testCatalog.add(testDisc2);
    }

    /**
     * Test getCatalog() returns all discs
     */
    @Test
    public void testGetCatalog() {
        when(dao.findAll()).thenReturn(testCatalog);

        Iterable<CompactDisc> result = service.getCatalog();

        assertNotNull("Catalog should not be null", result);
        List<CompactDisc> resultList = new ArrayList<>();
        result.forEach(resultList::add);
        assertEquals("Catalog should contain 2 discs", 2, resultList.size());
        verify(dao, times(1)).findAll();
    }

    /**
     * Test getCatalog() with empty catalog
     */
    @Test
    public void testGetCatalogEmpty() {
        when(dao.findAll()).thenReturn(new ArrayList<>());

        Iterable<CompactDisc> result = service.getCatalog();

        assertNotNull("Catalog should not be null", result);
        List<CompactDisc> resultList = new ArrayList<>();
        result.forEach(resultList::add);
        assertEquals("Catalog should be empty", 0, resultList.size());
        verify(dao, times(1)).findAll();
    }

    /**
     * Test getCompactDiscById() with existing ID
     */
    @Test
    public void testGetCompactDiscByIdFound() {
        when(dao.findById(1)).thenReturn(Optional.of(testDisc1));

        CompactDisc result = service.getCompactDiscById(1);

        assertNotNull("Disc should be found", result);
        assertEquals("ID should match", 1, result.getId());
        assertEquals("Title should match", "Abbey Road", result.getTitle());
        assertEquals("Artist should match", "The Beatles", result.getArtist());
        verify(dao, times(1)).findById(1);
    }

    /**
     * Test getCompactDiscById() with non-existing ID
     */
    @Test
    public void testGetCompactDiscByIdNotFound() {
        when(dao.findById(999)).thenReturn(Optional.empty());

        CompactDisc result = service.getCompactDiscById(999);

        assertNull("Disc should not be found", result);
        verify(dao, times(1)).findById(999);
    }

    /**
     * Test addNewCompactDisc() creates new disc
     */
    @Test
    public void testAddNewCompactDisc() {
        CompactDisc newDisc = new CompactDisc("Dark Side of the Moon", 14.99, "Pink Floyd", 10);
        newDisc.setId(3);

        when(dao.save(any(CompactDisc.class))).thenReturn(newDisc);

        CompactDisc result = service.addNewCompactDisc(newDisc);

        assertNotNull("Result should not be null", result);
        assertEquals("Title should match", "Dark Side of the Moon", result.getTitle());
        verify(dao, times(1)).save(any(CompactDisc.class));
    }

    /**
     * Test addNewCompactDisc() sets ID to 0
     */
    @Test
    public void testAddNewCompactDiscSetsIdToZero() {
        CompactDisc newDisc = new CompactDisc("Rumours", 13.99, "Fleetwood Mac", 20);
        newDisc.setId(5); // Set to non-zero initially

        when(dao.save(any(CompactDisc.class))).thenReturn(newDisc);

        service.addNewCompactDisc(newDisc);

        // Verify that setId(0) was called
        assertEquals("ID should have been reset to 0", 0, newDisc.getId());
        verify(dao, times(1)).save(newDisc);
    }

    /**
     * Test updateCompactDisc() modifies existing disc
     */
    @Test
    public void testUpdateCompactDisc() {
        when(dao.save(testDisc1)).thenReturn(testDisc1);

        testDisc1.setTitle("Abbey Road (Remastered)");
        testDisc1.setPrice(11.99);

        CompactDisc result = service.updateCompactDisc(testDisc1);

        assertNotNull("Result should not be null", result);
        assertEquals("Title should be updated", "Abbey Road (Remastered)", result.getTitle());
        assertEquals("Price should be updated", 11.99, result.getPrice(), 0.01);
        verify(dao, times(1)).save(testDisc1);
    }

    /**
     * Test deleteCompactDisc() by ID
     */
    @Test
    public void testDeleteCompactDiscById() {
        when(dao.findById(1)).thenReturn(Optional.of(testDisc1));

        service.deleteCompactDisc(1);

        verify(dao, times(1)).findById(1);
        verify(dao, times(1)).delete(testDisc1);
    }

    /**
     * Test deleteCompactDisc() by ID when not found
     */
    @Test(expected = Exception.class)
    public void testDeleteCompactDiscByIdNotFound() {
        when(dao.findById(999)).thenReturn(Optional.empty());

        service.deleteCompactDisc(999);
    }

    /**
     * Test deleteCompactDisc() by CompactDisc object
     */
    @Test
    public void testDeleteCompactDiscByObject() {
        service.deleteCompactDisc(testDisc2);

        verify(dao, times(1)).delete(testDisc2);
    }

    /**
     * Test getCompactDiscById() with ID 0
     */
    @Test
    public void testGetCompactDiscByIdZero() {
        when(dao.findById(0)).thenReturn(Optional.empty());

        CompactDisc result = service.getCompactDiscById(0);

        assertNull("Disc should not be found", result);
        verify(dao, times(1)).findById(0);
    }

    /**
     * Test getCompactDiscById() with negative ID
     */
    @Test
    public void testGetCompactDiscByIdNegative() {
        when(dao.findById(-1)).thenReturn(Optional.empty());

        CompactDisc result = service.getCompactDiscById(-1);

        assertNull("Disc should not be found", result);
        verify(dao, times(1)).findById(-1);
    }

    /**
     * Test addNewCompactDisc() with null title
     */
    @Test
    public void testAddNewCompactDiscWithNullTitle() {
        CompactDisc newDisc = new CompactDisc();
        newDisc.setId(4);
        newDisc.setTitle(null);
        newDisc.setPrice(9.99);
        newDisc.setArtist("Unknown Artist");
        newDisc.setTracks(5);

        when(dao.save(any(CompactDisc.class))).thenReturn(newDisc);

        CompactDisc result = service.addNewCompactDisc(newDisc);

        assertNotNull("Result should not be null", result);
        assertNull("Title should be null", result.getTitle());
        verify(dao, times(1)).save(any(CompactDisc.class));
    }

    /**
     * Test addNewCompactDisc() with null artist
     */
    @Test
    public void testAddNewCompactDiscWithNullArtist() {
        CompactDisc newDisc = new CompactDisc();
        newDisc.setId(5);
        newDisc.setTitle("Unknown Title");
        newDisc.setPrice(9.99);
        newDisc.setArtist(null);
        newDisc.setTracks(5);

        when(dao.save(any(CompactDisc.class))).thenReturn(newDisc);

        CompactDisc result = service.addNewCompactDisc(newDisc);

        assertNotNull("Result should not be null", result);
        assertNull("Artist should be null", result.getArtist());
        verify(dao, times(1)).save(any(CompactDisc.class));
    }

    /**
     * Test addNewCompactDisc() with zero price
     */
    @Test
    public void testAddNewCompactDiscWithZeroPrice() {
        CompactDisc newDisc = new CompactDisc("Free Album", 0.0, "Various", 10);
        newDisc.setId(6);

        when(dao.save(any(CompactDisc.class))).thenReturn(newDisc);

        CompactDisc result = service.addNewCompactDisc(newDisc);

        assertNotNull("Result should not be null", result);
        assertEquals("Price should be 0", 0.0, result.getPrice(), 0.01);
        verify(dao, times(1)).save(any(CompactDisc.class));
    }

    /**
     * Test addNewCompactDisc() with negative price
     */
    @Test
    public void testAddNewCompactDiscWithNegativePrice() {
        CompactDisc newDisc = new CompactDisc("Discount Album", -5.0, "Sale Artist", 15);
        newDisc.setId(7);

        when(dao.save(any(CompactDisc.class))).thenReturn(newDisc);

        CompactDisc result = service.addNewCompactDisc(newDisc);

        assertNotNull("Result should not be null", result);
        assertEquals("Price should be negative", -5.0, result.getPrice(), 0.01);
        verify(dao, times(1)).save(any(CompactDisc.class));
    }

    /**
     * Test updateCompactDisc() with null values
     */
    @Test
    public void testUpdateCompactDiscWithNullValues() {
        CompactDisc discToUpdate = new CompactDisc();
        discToUpdate.setId(8);
        discToUpdate.setTitle(null);
        discToUpdate.setArtist(null);
        discToUpdate.setPrice(null);
        discToUpdate.setTracks(null);

        when(dao.save(discToUpdate)).thenReturn(discToUpdate);

        CompactDisc result = service.updateCompactDisc(discToUpdate);

        assertNotNull("Result should not be null", result);
        assertNull("Title should be null", result.getTitle());
        assertNull("Artist should be null", result.getArtist());
        assertNull("Price should be null", result.getPrice());
        assertNull("Tracks should be null", result.getTracks());
        verify(dao, times(1)).save(discToUpdate);
    }

    /**
     * Test getCatalog() is transactional
     */
    @Test
    public void testGetCatalogMultipleCalls() {
        when(dao.findAll()).thenReturn(testCatalog);

        service.getCatalog();
        service.getCatalog();

        verify(dao, times(2)).findAll();
    }

    /**
     * Test deleteCompactDisc() by object with null ID
     */
    @Test
    public void testDeleteCompactDiscByObjectWithNullId() {
        CompactDisc discToDelete = new CompactDisc("Title", 9.99, "Artist", 10);

        service.deleteCompactDisc(discToDelete);

        verify(dao, times(1)).delete(discToDelete);
    }
}
