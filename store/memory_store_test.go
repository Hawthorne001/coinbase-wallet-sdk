// Copyright (c) 2019 Coinbase, Inc. See LICENSE

package store

import (
	"testing"

	"github.com/stretchr/testify/require"
)

type dummy struct {
	X int `json:"x"`
	Y int `json:"y"`
}

func TestMemoryStoreNonExisting(t *testing.T) {
	ms := NewMemoryStore()

	foo := dummy{}
	ok, err := ms.Get("foo", &foo)
	require.False(t, ok)
	require.Nil(t, err)
}

func TestMemoryStoreSetGet(t *testing.T) {
	ms := NewMemoryStore()

	foo := dummy{X: 10, Y: 20}
	err := ms.Set("foo", &foo)
	require.Nil(t, err)

	bar := dummy{X: 111, Y: 222}
	err = ms.Set("bar", &bar)
	require.Nil(t, err)

	loadedFoo := dummy{}
	ok, err := ms.Get("foo", &loadedFoo)
	require.True(t, ok)
	require.Nil(t, err)

	require.Equal(t, 10, loadedFoo.X)
	require.Equal(t, 20, loadedFoo.Y)

	loadedBar := dummy{}
	ok, err = ms.Get("bar", &loadedBar)
	require.True(t, ok)
	require.Nil(t, err)

	require.Equal(t, 111, loadedBar.X)
	require.Equal(t, 222, loadedBar.Y)
}

func TestMemoryStoreOverwrite(t *testing.T) {
	ms := NewMemoryStore()

	foo := dummy{X: 10, Y: 20}
	err := ms.Set("foo", &foo)
	require.Nil(t, err)

	newFoo := dummy{X: 123, Y: 456}
	err = ms.Set("foo", &newFoo)
	require.Nil(t, err)

	loadedFoo := dummy{}
	ok, err := ms.Get("foo", &loadedFoo)
	require.True(t, ok)
	require.Nil(t, err)

	require.Equal(t, 123, loadedFoo.X)
	require.Equal(t, 456, loadedFoo.Y)
}

func TestMemoryStoreRemove(t *testing.T) {
	ms := NewMemoryStore()

	foo := dummy{X: 10, Y: 20}
	err := ms.Set("foo", &foo)
	require.Nil(t, err)

	err = ms.Remove("foo")
	require.Nil(t, err)

	loadedFoo := dummy{}
	ok, err := ms.Get("foo", &loadedFoo)
	require.False(t, ok)
	require.Nil(t, err)
}