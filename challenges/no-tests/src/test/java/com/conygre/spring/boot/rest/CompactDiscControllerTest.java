package com.conygre.spring.boot.rest;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.conygre.spring.boot.entities.CompactDisc;
import com.conygre.spring.boot.services.CompactDiscService;

/**
 * Unit tests for the CompactDiscController class.
 * Uses Mockito to mock the CompactDiscService dependency.
 */
@RunWith(MockitoJUnitRunner.class)
public class CompactDiscControllerTest {

    @Mock
    private CompactDiscService service;

    @InjectMocks
    private CompactDiscController controller;

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
     * Test findAll() returns all discs
     */
    @Test
    public void testFindAll() {
        when(service.getCatalog()).thenReturn(testCatalog);

        Iterable<CompactDisc> result = controller.findAll();

        assertNotNull("Result should not be null", result);
        List<CompactDisc> resultList = new ArrayList<>();
        result.forEach(resultList::add);
        assertEquals("Should return 2 discs", 2, resultList.size());
        verify(service, times(1)).getCatalog();
    }

    /**
     * Test findAll() with empty catalog
     */
    @Test
    public void testFindAllEmpty() {
        when(service.getCatalog()).thenReturn(new ArrayList<>());

        Iterable<CompactDisc> result = controller.findAll();

        assertNotNull("Result should not be null", result);
        List<CompactDisc> resultList = new ArrayList<>();
        result.forEach(resultList::add);
        assertEquals("Should return empty catalog", 0, resultList.size());
        verify(service, times(1)).getCatalog();
    }

    /**
     * Test getCdById() returns correct disc
     */
    @Test
    public void testGetCdById() {
        when(service.getCompactDiscById(1)).thenReturn(testDisc1);

        CompactDisc result = controller.getCdById(1);

        assertNotNull("Result should not be null", result);
        assertEquals("ID should match", 1, result.getId());
        assertEquals("Title should match", "Abbey Road", result.getTitle());
        verify(service, times(1)).getCompactDiscById(1);
    }

    /**
     * Test getCdById() with non-existing ID
     */
    @Test
    public void testGetCdByIdNotFound() {
        when(service.getCompactDiscById(999)).thenReturn(null);

        CompactDisc result = controller.getCdById(999);

        assertNull("Result should be null", result);
        verify(service, times(1)).getCompactDiscById(999);
    }

    /**
     * Test getCdById() with ID 0
     */
    @Test
    public void testGetCdByIdZero() {
        when(service.getCompactDiscById(0)).thenReturn(null);

        CompactDisc result = controller.getCdById(0);

        assertNull("Result should be null", result);
        verify(service, times(1)).getCompactDiscById(0);
    }

    /**
     * Test getCdById() with negative ID
     */
    @Test
    public void testGetCdByIdNegative() {
        when(service.getCompactDiscById(-1)).thenReturn(null);

        CompactDisc result = controller.getCdById(-1);

        assertNull("Result should be null", result);
        verify(service, times(1)).getCompactDiscById(-1);
    }

    /**
     * Test getByIdWith404() returns OK when disc exists
     */
    @Test
    public void testGetByIdWith404Found() {
        when(service.getCompactDiscById(1)).thenReturn(testDisc1);

        ResponseEntity<CompactDisc> result = controller.getByIdWith404(1);

        assertNotNull("Result should not be null", result);
        assertEquals("Status should be OK", HttpStatus.OK, result.getStatusCode());
        assertEquals("Body should contain disc", testDisc1, result.getBody());
        verify(service, times(1)).getCompactDiscById(1);
    }

    /**
     * Test getByIdWith404() returns NOT_FOUND when disc doesn't exist
     */
    @Test
    public void testGetByIdWith404NotFound() {
        when(service.getCompactDiscById(999)).thenReturn(null);

        ResponseEntity<CompactDisc> result = controller.getByIdWith404(999);

        assertNotNull("Result should not be null", result);
        assertEquals("Status should be NOT_FOUND", HttpStatus.NOT_FOUND, result.getStatusCode());
        assertNull("Body should be null", result.getBody());
        verify(service, times(1)).getCompactDiscById(999);
    }

    /**
     * Test getByIdWith404() with ID 0
     */
    @Test
    public void testGetByIdWith404IdZero() {
        when(service.getCompactDiscById(0)).thenReturn(null);

        ResponseEntity<CompactDisc> result = controller.getByIdWith404(0);

        assertEquals("Status should be NOT_FOUND", HttpStatus.NOT_FOUND, result.getStatusCode());
        assertNull("Body should be null", result.getBody());
    }

    /**
     * Test getByIdWith404() with negative ID
     */
    @Test
    public void testGetByIdWith404NegativeId() {
        when(service.getCompactDiscById(-5)).thenReturn(null);

        ResponseEntity<CompactDisc> result = controller.getByIdWith404(-5);

        assertEquals("Status should be NOT_FOUND", HttpStatus.NOT_FOUND, result.getStatusCode());
        assertNull("Body should be null", result.getBody());
    }

    /**
     * Test deleteCd() by ID
     */
    @Test
    public void testDeleteCdById() {
        controller.deleteCd(1);

        verify(service, times(1)).deleteCompactDisc(1);
    }

    /**
     * Test deleteCd() by ID with 0
     */
    @Test
    public void testDeleteCdByIdZero() {
        controller.deleteCd(0);

        verify(service, times(1)).deleteCompactDisc(0);
    }

    /**
     * Test deleteCd() by ID with negative value
     */
    @Test
    public void testDeleteCdByIdNegative() {
        controller.deleteCd(-1);

        verify(service, times(1)).deleteCompactDisc(-1);
    }

    /**
     * Test deleteCd() by CompactDisc object
     */
    @Test
    public void testDeleteCdByObject() {
        controller.deleteCd(testDisc2);

        verify(service, times(1)).deleteCompactDisc(testDisc2);
    }

    /**
     * Test deleteCd() by CompactDisc object with null values
     */
    @Test
    public void testDeleteCdByObjectWithNullValues() {
        CompactDisc discToDelete = new CompactDisc(null, 0.0, null, 0);

        controller.deleteCd(discToDelete);

        verify(service, times(1)).deleteCompactDisc(discToDelete);
    }

    /**
     * Test addCd() with new disc
     */
    @Test
    public void testAddCd() {
        CompactDisc newDisc = new CompactDisc("Dark Side of the Moon", 14.99, "Pink Floyd", 10);
        newDisc.setId(3);

        when(service.addNewCompactDisc(newDisc)).thenReturn(newDisc);

        controller.addCd(newDisc);

        verify(service, times(1)).addNewCompactDisc(newDisc);
    }

    /**
     * Test addCd() with disc containing all fields
     */
    @Test
    public void testAddCdCompleteDisc() {
        CompactDisc completedisc = new CompactDisc("Master of Puppets", 13.99, "Metallica", 8);
        completedisc.setId(4);

        when(service.addNewCompactDisc(completedisc)).thenReturn(completedisc);

        controller.addCd(completedisc);

        verify(service, times(1)).addNewCompactDisc(completedisc);
    }

    /**
     * Test addCd() with disc containing null title
     */
    @Test
    public void testAddCdWithNullTitle() {
        CompactDisc discWithNullTitle = new CompactDisc(null, 9.99, "Artist", 5);

        when(service.addNewCompactDisc(discWithNullTitle)).thenReturn(discWithNullTitle);

        controller.addCd(discWithNullTitle);

        verify(service, times(1)).addNewCompactDisc(discWithNullTitle);
    }

    /**
     * Test addCd() with disc containing null artist
     */
    @Test
    public void testAddCdWithNullArtist() {
        CompactDisc discWithNullArtist = new CompactDisc("Title", 9.99, null, 5);

        when(service.addNewCompactDisc(discWithNullArtist)).thenReturn(discWithNullArtist);

        controller.addCd(discWithNullArtist);

        verify(service, times(1)).addNewCompactDisc(discWithNullArtist);
    }

    /**
     * Test addCd() with disc containing null price
     */
    @Test
    public void testAddCdWithNullPrice() {
        CompactDisc discWithNullPrice = new CompactDisc();
        discWithNullPrice.setId(5);
        discWithNullPrice.setTitle("Title");
        discWithNullPrice.setPrice(null);
        discWithNullPrice.setArtist("Artist");
        discWithNullPrice.setTracks(5);

        when(service.addNewCompactDisc(discWithNullPrice)).thenReturn(discWithNullPrice);

        controller.addCd(discWithNullPrice);

        verify(service, times(1)).addNewCompactDisc(discWithNullPrice);
    }

    /**
     * Test addCd() with disc containing zero price
     */
    @Test
    public void testAddCdWithZeroPrice() {
        CompactDisc discWithZeroPrice = new CompactDisc("Free Album", 0.0, "Various", 10);

        when(service.addNewCompactDisc(discWithZeroPrice)).thenReturn(discWithZeroPrice);

        controller.addCd(discWithZeroPrice);

        verify(service, times(1)).addNewCompactDisc(discWithZeroPrice);
    }

    /**
     * Test addCd() with disc containing negative price
     */
    @Test
    public void testAddCdWithNegativePrice() {
        CompactDisc discWithNegativePrice = new CompactDisc("Discount", -5.0, "Sale", 8);

        when(service.addNewCompactDisc(discWithNegativePrice)).thenReturn(discWithNegativePrice);

        controller.addCd(discWithNegativePrice);

        verify(service, times(1)).addNewCompactDisc(discWithNegativePrice);
    }

    /**
     * Test addCd() with disc containing null tracks
     */
    @Test
    public void testAddCdWithNullTracks() {
        CompactDisc discWithNullTracks = new CompactDisc("Title", 9.99, "Artist", 0);
        discWithNullTracks.setTracks(null);

        when(service.addNewCompactDisc(discWithNullTracks)).thenReturn(discWithNullTracks);

        controller.addCd(discWithNullTracks);

        verify(service, times(1)).addNewCompactDisc(discWithNullTracks);
    }

    /**
     * Test controller returns correct service responses
     */
    @Test
    public void testControllerIntegrationWithService() {
        when(service.getCatalog()).thenReturn(testCatalog);
        when(service.getCompactDiscById(1)).thenReturn(testDisc1);

        Iterable<CompactDisc> allDiscs = controller.findAll();
        CompactDisc singleDisc = controller.getCdById(1);

        assertNotNull("All discs should be returned", allDiscs);
        assertNotNull("Single disc should be returned", singleDisc);
        assertEquals("Retrieved disc should match", testDisc1.getId(), singleDisc.getId());
        verify(service).getCatalog();
        verify(service).getCompactDiscById(1);
    }

    /**
     * Test multiple calls to same endpoint
     */
    @Test
    public void testMultipleCallsToFindAll() {
        when(service.getCatalog()).thenReturn(testCatalog);

        controller.findAll();
        controller.findAll();
        controller.findAll();

        verify(service, times(3)).getCatalog();
    }

    /**
     * Test getByIdWith404() with large ID
     */
    @Test
    public void testGetByIdWith404LargeId() {
        when(service.getCompactDiscById(Integer.MAX_VALUE)).thenReturn(null);

        ResponseEntity<CompactDisc> result = controller.getByIdWith404(Integer.MAX_VALUE);

        assertEquals("Status should be NOT_FOUND", HttpStatus.NOT_FOUND, result.getStatusCode());
    }
}
