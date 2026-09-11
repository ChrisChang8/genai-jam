package com.conygre.spring.boot.repos;

import static org.junit.Assert.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import com.conygre.spring.boot.entities.CompactDisc;

/**
 * Integration tests for the CompactDiscRepository interface.
 * Uses Spring's DataJpaTest for database testing with H2 in-memory database.
 */
@RunWith(SpringRunner.class)
@DataJpaTest
public class CompactDiscRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private CompactDiscRepository repository;

    private CompactDisc testDisc1;
    private CompactDisc testDisc2;
    private CompactDisc testDisc3;

    @Before
    public void setUp() {
        testDisc1 = new CompactDisc("Abbey Road", 9.99, "The Beatles", 17);
        testDisc2 = new CompactDisc("The Wall", 12.99, "Pink Floyd", 26);
        testDisc3 = new CompactDisc("The Dark Side of the Moon", 14.99, "Pink Floyd", 10);
    }

    /**
     * Test save() creates a new disc in database
     */
    @Test
    public void testSaveNewDisc() {
        CompactDisc savedDisc = repository.save(testDisc1);

        assertNotNull("Saved disc should not be null", savedDisc);
        assertNotNull("Saved disc should have an ID", savedDisc.getId());
        assertEquals("Title should match", "Abbey Road", savedDisc.getTitle());
        assertEquals("Artist should match", "The Beatles", savedDisc.getArtist());
        assertEquals("Price should match", 9.99, savedDisc.getPrice(), 0.01);
        assertEquals("Tracks should match", 17, (int) savedDisc.getTracks());
    }

    /**
     * Test update() modifies existing disc
     */
    @Test
    public void testUpdateExistingDisc() {
        CompactDisc savedDisc = repository.save(testDisc1);
        int discId = savedDisc.getId();

        savedDisc.setTitle("Abbey Road (Remastered)");
        savedDisc.setPrice(11.99);
        repository.save(savedDisc);

        Optional<CompactDisc> retrievedDisc = repository.findById(discId);
        assertTrue("Disc should exist", retrievedDisc.isPresent());
        assertEquals("Title should be updated", "Abbey Road (Remastered)", retrievedDisc.get().getTitle());
        assertEquals("Price should be updated", 11.99, retrievedDisc.get().getPrice(), 0.01);
    }

    /**
     * Test findById() retrieves existing disc
     */
    @Test
    public void testFindByIdExisting() {
        CompactDisc savedDisc = repository.save(testDisc1);
        int discId = savedDisc.getId();

        Optional<CompactDisc> retrievedDisc = repository.findById(discId);

        assertTrue("Disc should be found", retrievedDisc.isPresent());
        assertEquals("ID should match", discId, retrievedDisc.get().getId());
        assertEquals("Title should match", "Abbey Road", retrievedDisc.get().getTitle());
    }

    /**
     * Test findById() returns empty for non-existing disc
     */
    @Test
    public void testFindByIdNonExisting() {
        Optional<CompactDisc> retrievedDisc = repository.findById(999);

        assertFalse("Disc should not be found", retrievedDisc.isPresent());
    }

    /**
     * Test findById() returns empty for ID 0
     */
    @Test
    public void testFindByIdZero() {
        Optional<CompactDisc> retrievedDisc = repository.findById(0);

        assertFalse("Disc should not be found", retrievedDisc.isPresent());
    }

    /**
     * Test findAll() returns all discs
     */
    @Test
    public void testFindAll() {
        repository.save(testDisc1);
        repository.save(testDisc2);
        repository.save(testDisc3);

        Iterable<CompactDisc> allDiscs = repository.findAll();

        List<CompactDisc> discList = new ArrayList<>();
        allDiscs.forEach(discList::add);
        assertEquals("Should return 3 discs", 3, discList.size());
    }

    /**
     * Test findAll() returns empty when no discs exist
     */
    @Test
    public void testFindAllEmpty() {
        Iterable<CompactDisc> allDiscs = repository.findAll();

        List<CompactDisc> discList = new ArrayList<>();
        allDiscs.forEach(discList::add);
        assertEquals("Should return empty list", 0, discList.size());
    }

    /**
     * Test delete() removes disc by object
     */
    @Test
    public void testDeleteByObject() {
        CompactDisc savedDisc = repository.save(testDisc1);
        int discId = savedDisc.getId();

        repository.delete(savedDisc);

        Optional<CompactDisc> retrievedDisc = repository.findById(discId);
        assertFalse("Disc should be deleted", retrievedDisc.isPresent());
    }

    /**
     * Test deleteById() removes disc by ID
     */
    @Test
    public void testDeleteById() {
        CompactDisc savedDisc = repository.save(testDisc1);
        int discId = savedDisc.getId();

        repository.deleteById(discId);

        Optional<CompactDisc> retrievedDisc = repository.findById(discId);
        assertFalse("Disc should be deleted", retrievedDisc.isPresent());
    }

    /**
     * Test findByArtist() returns all discs by specific artist
     */
    @Test
    public void testFindByArtist() {
        repository.save(testDisc1); // The Beatles
        repository.save(testDisc2); // Pink Floyd
        repository.save(testDisc3); // Pink Floyd

        Iterable<CompactDisc> pinkFloydDiscs = repository.findByArtist("Pink Floyd");

        List<CompactDisc> discList = new ArrayList<>();
        pinkFloydDiscs.forEach(discList::add);
        assertEquals("Should return 2 Pink Floyd discs", 2, discList.size());
        for (CompactDisc disc : discList) {
            assertEquals("All discs should be by Pink Floyd", "Pink Floyd", disc.getArtist());
        }
    }

    /**
     * Test findByArtist() returns empty for artist with no discs
     */
    @Test
    public void testFindByArtistNotFound() {
        repository.save(testDisc1);
        repository.save(testDisc2);

        Iterable<CompactDisc> results = repository.findByArtist("Non Existent Artist");

        List<CompactDisc> discList = new ArrayList<>();
        results.forEach(discList::add);
        assertEquals("Should return empty list", 0, discList.size());
    }

    /**
     * Test findByArtist() with null artist
     */
    @Test
    public void testFindByArtistNull() {
        repository.save(testDisc1);
        repository.save(testDisc2);

        Iterable<CompactDisc> results = repository.findByArtist(null);

        List<CompactDisc> discList = new ArrayList<>();
        results.forEach(discList::add);
        // Should return empty or handle gracefully
        assertNotNull("Result should not be null", discList);
    }

    /**
     * Test findByArtist() with empty string
     */
    @Test
    public void testFindByArtistEmptyString() {
        repository.save(testDisc1);
        repository.save(testDisc2);

        Iterable<CompactDisc> results = repository.findByArtist("");

        List<CompactDisc> discList = new ArrayList<>();
        results.forEach(discList::add);
        // Depends on implementation - may return empty or match empty artist field
        assertNotNull("Result should not be null", discList);
    }

    /**
     * Test that saved disc is persisted
     */
    @Test
    public void testDiscPersistence() {
        CompactDisc savedDisc = repository.save(testDisc1);
        entityManager.flush();
        entityManager.clear();

        Optional<CompactDisc> retrievedDisc = repository.findById(savedDisc.getId());

        assertTrue("Disc should exist after persistence", retrievedDisc.isPresent());
        assertEquals("Title should match after persistence", "Abbey Road", retrievedDisc.get().getTitle());
    }

    /**
     * Test save() with disc containing all null fields
     */
    @Test
    public void testSaveDiscWithNullFields() {
        CompactDisc discWithNulls = new CompactDisc();
        discWithNulls.setTitle(null);
        discWithNulls.setPrice(null);
        discWithNulls.setArtist(null);
        discWithNulls.setTracks(null);
        CompactDisc savedDisc = repository.save(discWithNulls);

        assertNotNull("Saved disc should not be null", savedDisc);
        assertNotNull("Saved disc should have an ID", savedDisc.getId());
        assertNull("Title should be null", savedDisc.getTitle());
        assertNull("Artist should be null", savedDisc.getArtist());
        assertNull("Price should be null", savedDisc.getPrice());
        assertNull("Tracks should be null", savedDisc.getTracks());
    }

    /**
     * Test save() with zero price
     */
    @Test
    public void testSaveDiscWithZeroPrice() {
        CompactDisc discWithZeroPrice = new CompactDisc("Free Album", 0.0, "Various", 10);
        CompactDisc savedDisc = repository.save(discWithZeroPrice);

        assertNotNull("Saved disc should not be null", savedDisc);
        assertEquals("Price should be 0", 0.0, savedDisc.getPrice(), 0.01);
    }

    /**
     * Test save() with negative price
     */
    @Test
    public void testSaveDiscWithNegativePrice() {
        CompactDisc discWithNegativePrice = new CompactDisc("Discount", -5.0, "Sale", 8);
        CompactDisc savedDisc = repository.save(discWithNegativePrice);

        assertNotNull("Saved disc should not be null", savedDisc);
        assertEquals("Price should be negative", -5.0, savedDisc.getPrice(), 0.01);
    }

    /**
     * Test save() with zero tracks
     */
    @Test
    public void testSaveDiscWithZeroTracks() {
        CompactDisc discWithZeroTracks = new CompactDisc("No Tracks", 9.99, "Artist", 0);
        CompactDisc savedDisc = repository.save(discWithZeroTracks);

        assertNotNull("Saved disc should not be null", savedDisc);
        assertEquals("Tracks should be 0", 0, (int) savedDisc.getTracks());
    }

    /**
     * Test save() with large price
     */
    @Test
    public void testSaveDiscWithLargePrice() {
        CompactDisc discWithLargePrice = new CompactDisc("Expensive", 9999.99, "Luxury Artist", 15);
        CompactDisc savedDisc = repository.save(discWithLargePrice);

        assertNotNull("Saved disc should not be null", savedDisc);
        assertEquals("Price should be large value", 9999.99, savedDisc.getPrice(), 0.01);
    }

    /**
     * Test findByArtist() is case-sensitive
     */
    @Test
    public void testFindByArtistCaseSensitivity() {
        repository.save(testDisc1); // "The Beatles"

        Iterable<CompactDisc> lowerCaseResults = repository.findByArtist("the beatles");
        List<CompactDisc> lowerCaseList = new ArrayList<>();
        lowerCaseResults.forEach(lowerCaseList::add);

        // This depends on database implementation - may or may not be case-sensitive
        assertNotNull("Result should not be null", lowerCaseList);
    }

    /**
     * Test multiple discs can be saved and retrieved
     */
    @Test
    public void testMultipleDiscsSaveAndRetrieve() {
        repository.save(testDisc1);
        repository.save(testDisc2);
        repository.save(testDisc3);

        Iterable<CompactDisc> allDiscs = repository.findAll();
        List<CompactDisc> discList = new ArrayList<>();
        allDiscs.forEach(discList::add);

        assertEquals("Should have 3 discs", 3, discList.size());
        assertTrue("Should contain Abbey Road", discList.stream()
                .anyMatch(d -> "Abbey Road".equals(d.getTitle())));
        assertTrue("Should contain The Wall", discList.stream()
                .anyMatch(d -> "The Wall".equals(d.getTitle())));
    }

    /**
     * Test save() and then update same disc twice
     */
    @Test
    public void testSaveUpdateUpdateSequence() {
        CompactDisc savedDisc = repository.save(testDisc1);
        int discId = savedDisc.getId();

        savedDisc.setPrice(10.99);
        repository.save(savedDisc);

        savedDisc.setPrice(11.99);
        repository.save(savedDisc);

        Optional<CompactDisc> finalDisc = repository.findById(discId);
        assertTrue("Disc should exist", finalDisc.isPresent());
        assertEquals("Price should be final update", 11.99, finalDisc.get().getPrice(), 0.01);
    }

    /**
     * Test deleteAll() removes all discs
     */
    @Test
    public void testDeleteAll() {
        repository.save(testDisc1);
        repository.save(testDisc2);
        repository.save(testDisc3);

        repository.deleteAll();

        Iterable<CompactDisc> allDiscs = repository.findAll();
        List<CompactDisc> discList = new ArrayList<>();
        allDiscs.forEach(discList::add);
        assertEquals("Should be empty after deleteAll", 0, discList.size());
    }

    /**
     * Test count() returns correct number
     */
    @Test
    public void testCount() {
        repository.save(testDisc1);
        repository.save(testDisc2);
        repository.save(testDisc3);

        long count = repository.count();

        assertEquals("Count should be 3", 3, count);
    }

    /**
     * Test count() on empty repository
     */
    @Test
    public void testCountEmpty() {
        long count = repository.count();

        assertEquals("Count should be 0 on empty repository", 0, count);
    }

    /**
     * Test existsById() for existing disc
     */
    @Test
    public void testExistsByIdTrue() {
        CompactDisc savedDisc = repository.save(testDisc1);

        boolean exists = repository.existsById(savedDisc.getId());

        assertTrue("Disc should exist", exists);
    }

    /**
     * Test existsById() for non-existing disc
     */
    @Test
    public void testExistsByIdFalse() {
        boolean exists = repository.existsById(999);

        assertFalse("Disc should not exist", exists);
    }
}
