package com.conygre.spring.boot.entities;

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;

/**
 * Unit tests for the CompactDisc entity class.
 * Tests constructors, getters, setters, and edge cases.
 */
public class CompactDiscTest {

    private CompactDisc disc;

    @Before
    public void setUp() {
        disc = new CompactDisc();
    }

    /**
     * Test the default constructor creates an empty CompactDisc
     */
    @Test
    public void testDefaultConstructor() {
        CompactDisc newDisc = new CompactDisc();
        assertNotNull("CompactDisc should be created", newDisc);
    }

    /**
     * Test the parameterized constructor with all values
     */
    @Test
    public void testParameterizedConstructor() {
        String title = "Abbey Road";
        double price = 9.99;
        String artist = "The Beatles";
        int tracks = 17;

        CompactDisc newDisc = new CompactDisc(title, price, artist, tracks);

        assertEquals("Title should match constructor parameter", title, newDisc.getTitle());
        assertEquals("Price should match constructor parameter", price, newDisc.getPrice(), 0.01);
        assertEquals("Artist should match constructor parameter", artist, newDisc.getArtist());
        assertEquals("Tracks should match constructor parameter", tracks, (int) newDisc.getTracks());
    }

    /**
     * Test setting and getting the ID
     */
    @Test
    public void testSetAndGetId() {
        disc.setId(1);
        assertEquals("ID should be set correctly", 1, disc.getId());
    }

    /**
     * Test setting and getting the title
     */
    @Test
    public void testSetAndGetTitle() {
        String title = "The Wall";
        disc.setTitle(title);
        assertEquals("Title should be set correctly", title, disc.getTitle());
    }

    /**
     * Test setting and getting the artist
     */
    @Test
    public void testSetAndGetArtist() {
        String artist = "Pink Floyd";
        disc.setArtist(artist);
        assertEquals("Artist should be set correctly", artist, disc.getArtist());
    }

    /**
     * Test setting and getting the price
     */
    @Test
    public void testSetAndGetPrice() {
        Double price = 12.99;
        disc.setPrice(price);
        assertEquals("Price should be set correctly", price, disc.getPrice(), 0.01);
    }

    /**
     * Test setting and getting the number of tracks
     */
    @Test
    public void testSetAndGetTracks() {
        Integer tracks = 12;
        disc.setTracks(tracks);
        assertEquals("Tracks should be set correctly", tracks, disc.getTracks());
    }

    /**
     * Test title with null value
     */
    @Test
    public void testTitleWithNull() {
        disc.setTitle(null);
        assertNull("Title should be null when set to null", disc.getTitle());
    }

    /**
     * Test artist with null value
     */
    @Test
    public void testArtistWithNull() {
        disc.setArtist(null);
        assertNull("Artist should be null when set to null", disc.getArtist());
    }

    /**
     * Test price with null value
     */
    @Test
    public void testPriceWithNull() {
        disc.setPrice(null);
        assertNull("Price should be null when set to null", disc.getPrice());
    }

    /**
     * Test tracks with null value
     */
    @Test
    public void testTracksWithNull() {
        disc.setTracks(null);
        assertNull("Tracks should be null when set to null", disc.getTracks());
    }

    /**
     * Test price with zero value
     */
    @Test
    public void testPriceWithZero() {
        disc.setPrice(0.0);
        assertEquals("Price should accept zero value", 0.0, disc.getPrice(), 0.01);
    }

    /**
     * Test price with negative value
     */
    @Test
    public void testPriceWithNegative() {
        disc.setPrice(-5.99);
        assertEquals("Price should accept negative value", -5.99, disc.getPrice(), 0.01);
    }

    /**
     * Test tracks with zero value
     */
    @Test
    public void testTracksWithZero() {
        disc.setTracks(0);
        assertEquals("Tracks should accept zero value", 0, (int) disc.getTracks());
    }

    /**
     * Test tracks with negative value
     */
    @Test
    public void testTracksWithNegative() {
        disc.setTracks(-5);
        assertEquals("Tracks should accept negative value", -5, (int) disc.getTracks());
    }

    /**
     * Test title with empty string
     */
    @Test
    public void testTitleWithEmptyString() {
        disc.setTitle("");
        assertEquals("Title should accept empty string", "", disc.getTitle());
    }

    /**
     * Test artist with empty string
     */
    @Test
    public void testArtistWithEmptyString() {
        disc.setArtist("");
        assertEquals("Artist should accept empty string", "", disc.getArtist());
    }

    /**
     * Test setting multiple properties
     */
    @Test
    public void testMultiplePropertyChanges() {
        disc.setId(5);
        disc.setTitle("Dark Side of the Moon");
        disc.setArtist("Pink Floyd");
        disc.setPrice(14.99);
        disc.setTracks(10);

        assertEquals("ID should be 5", 5, disc.getId());
        assertEquals("Title should be Dark Side of the Moon", "Dark Side of the Moon", disc.getTitle());
        assertEquals("Artist should be Pink Floyd", "Pink Floyd", disc.getArtist());
        assertEquals("Price should be 14.99", 14.99, disc.getPrice(), 0.01);
        assertEquals("Tracks should be 10", 10, (int) disc.getTracks());
    }

    /**
     * Test that CompactDisc implements Serializable
     */
    @Test
    public void testCompactDiscIsSerializable() {
        assertTrue("CompactDisc should implement Serializable",
                java.io.Serializable.class.isAssignableFrom(CompactDisc.class));
    }

    /**
     * Test ID with large value
     */
    @Test
    public void testIdWithLargeValue() {
        disc.setId(Integer.MAX_VALUE);
        assertEquals("ID should accept large value", Integer.MAX_VALUE, disc.getId());
    }

    /**
     * Test price with large value
     */
    @Test
    public void testPriceWithLargeValue() {
        disc.setPrice(999999.99);
        assertEquals("Price should accept large value", 999999.99, disc.getPrice(), 0.01);
    }

    /**
     * Test title with special characters
     */
    @Test
    public void testTitleWithSpecialCharacters() {
        String title = "Master of Puppets™ (Remastered™)";
        disc.setTitle(title);
        assertEquals("Title should handle special characters", title, disc.getTitle());
    }

    /**
     * Test artist with special characters
     */
    @Test
    public void testArtistWithSpecialCharacters() {
        String artist = "Mötley Crüe";
        disc.setArtist(artist);
        assertEquals("Artist should handle special characters", artist, disc.getArtist());
    }
}
