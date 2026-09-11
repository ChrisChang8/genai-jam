package com.conygre.spring.boot.entities;

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;

/**
 * Unit tests for the Track entity class.
 * Tests constructors, getters, setters, and edge cases.
 */
public class TrackTest {

    private Track track;

    @Before
    public void setUp() {
        track = new Track();
    }

    /**
     * Test the default constructor creates an empty Track
     */
    @Test
    public void testDefaultConstructor() {
        Track newTrack = new Track();
        assertNotNull("Track should be created", newTrack);
    }

    /**
     * Test the constructor with title only
     */
    @Test
    public void testConstructorWithTitle() {
        String title = "Bohemian Rhapsody";
        Track newTrack = new Track(title);
        assertEquals("Title should match constructor parameter", title, newTrack.getTitle());
    }

    /**
     * Test the constructor with id, title, and cdId
     */
    @Test
    public void testConstructorWithAllParameters() {
        int id = 1;
        String title = "Stairway to Heaven";
        int cdId = 5;

        Track newTrack = new Track(id, title, cdId);

        assertEquals("ID should match constructor parameter", id, (int) newTrack.getId());
        assertEquals("Title should match constructor parameter", title, newTrack.getTitle());
        assertEquals("CD ID should match constructor parameter", cdId, newTrack.getCdId());
    }

    /**
     * Test setting and getting the ID
     */
    @Test
    public void testSetAndGetId() {
        track.setId(1);
        assertEquals("ID should be set correctly", 1, (int) track.getId());
    }

    /**
     * Test setting and getting the title
     */
    @Test
    public void testSetAndGetTitle() {
        String title = "Come Together";
        track.setTitle(title);
        assertEquals("Title should be set correctly", title, track.getTitle());
    }

    /**
     * Test setting and getting the CD ID
     */
    @Test
    public void testSetAndGetCdId() {
        track.setCdId(3);
        assertEquals("CD ID should be set correctly", 3, track.getCdId());
    }

    /**
     * Test title with null value
     */
    @Test
    public void testTitleWithNull() {
        track.setTitle(null);
        assertNull("Title should be null when set to null", track.getTitle());
    }

    /**
     * Test title with empty string
     */
    @Test
    public void testTitleWithEmptyString() {
        track.setTitle("");
        assertEquals("Title should accept empty string", "", track.getTitle());
    }

    /**
     * Test ID with zero value
     */
    @Test
    public void testIdWithZero() {
        track.setId(0);
        assertEquals("ID should accept zero value", 0, (int) track.getId());
    }

    /**
     * Test ID with negative value
     */
    @Test
    public void testIdWithNegative() {
        track.setId(-1);
        assertEquals("ID should accept negative value", -1, (int) track.getId());
    }

    /**
     * Test CD ID with zero value
     */
    @Test
    public void testCdIdWithZero() {
        track.setCdId(0);
        assertEquals("CD ID should accept zero value", 0, track.getCdId());
    }

    /**
     * Test CD ID with negative value
     */
    @Test
    public void testCdIdWithNegative() {
        track.setCdId(-5);
        assertEquals("CD ID should accept negative value", -5, track.getCdId());
    }

    /**
     * Test title with special characters
     */
    @Test
    public void testTitleWithSpecialCharacters() {
        String title = "Don't Stop Believin'";
        track.setTitle(title);
        assertEquals("Title should handle special characters", title, track.getTitle());
    }

    /**
     * Test title with unicode characters
     */
    @Test
    public void testTitleWithUnicodeCharacters() {
        String title = "Café au Lait";
        track.setTitle(title);
        assertEquals("Title should handle unicode characters", title, track.getTitle());
    }

    /**
     * Test title with very long string
     */
    @Test
    public void testTitleWithLongString() {
        String title = "A".repeat(500);
        track.setTitle(title);
        assertEquals("Title should accept very long string", title, track.getTitle());
    }

    /**
     * Test ID with large value
     */
    @Test
    public void testIdWithLargeValue() {
        track.setId(Integer.MAX_VALUE);
        assertEquals("ID should accept large value", Integer.MAX_VALUE, (int) track.getId());
    }

    /**
     * Test CD ID with large value
     */
    @Test
    public void testCdIdWithLargeValue() {
        track.setCdId(Integer.MAX_VALUE);
        assertEquals("CD ID should accept large value", Integer.MAX_VALUE, track.getCdId());
    }

    /**
     * Test setting multiple properties
     */
    @Test
    public void testMultiplePropertyChanges() {
        track.setId(5);
        track.setTitle("Imagine");
        track.setCdId(10);

        assertEquals("ID should be 5", 5, (int) track.getId());
        assertEquals("Title should be Imagine", "Imagine", track.getTitle());
        assertEquals("CD ID should be 10", 10, track.getCdId());
    }

    /**
     * Test that Track implements Serializable
     */
    @Test
    public void testTrackIsSerializable() {
        assertTrue("Track should implement Serializable",
                java.io.Serializable.class.isAssignableFrom(Track.class));
    }

    /**
     * Test ID null value (using Integer wrapper)
     */
    @Test
    public void testIdWithNull() {
        track.setId(5);
        track.setId(null);
        assertNull("ID should be null when set to null", track.getId());
    }

    /**
     * Test title with leading/trailing whitespace
     */
    @Test
    public void testTitleWithWhitespace() {
        String title = "  Song Title  ";
        track.setTitle(title);
        assertEquals("Title should preserve whitespace", title, track.getTitle());
    }

    /**
     * Test title with newlines
     */
    @Test
    public void testTitleWithNewlines() {
        String title = "Line 1\nLine 2";
        track.setTitle(title);
        assertEquals("Title should handle newlines", title, track.getTitle());
    }

    /**
     * Test title with tabs
     */
    @Test
    public void testTitleWithTabs() {
        String title = "Title\tWith\tTabs";
        track.setTitle(title);
        assertEquals("Title should handle tabs", title, track.getTitle());
    }
}
